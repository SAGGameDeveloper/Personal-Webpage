// This code is based on: https://github.com/doebi/liquidfun.js-demo

// I use GetParticleCount divided by 2 to avoid a Liquidfun
// known bug, where GetParticleCount returns twice what it should, see
// https://github.com/google/liquidfun/issues/50

import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import Script from 'react-load-script'
import LiquidfunContainer from '../utils/liquidfun_container'
import BoatImage from '../images/boat.png'

// Elapsed time between frames
const TARGET_MS = 1000/60;

// Simulation parameters
const SIMULATION_WIDTH = 60;
const PARTICLE_SIZE = 0.17;
const GRAVITY = [0, 9.81];
const COLOR = 0xe6dabc;
const WALL_THICKNESS = 20;
const WALL_LENGTH = 250;
const SEA_DEPTH = 2;
const WALL_MARGIN = 0.1;

const TORNADO = {
  x: 0,
  y: 0,
  active: false,

  growth: 0.1,
  speed: 10,
  maxSpeed: 40,
  angle: 0.5,
  size: 20,
}

class Game extends Component {
  constructor(props) {
    super(props);

    this.allLoaded = false;
  }

  componentDidMount() {  }

  render() {
    return (<>
              <Script
                url="scripts/liquidfun.js"
                onLoad={ this.setup.bind(this) }
              />
            </>)
  }

  // --- GAME LOGIC ---

  // Liquidfun and Pixi initializations
  setup() {
    // Pixi initialization
    this.app = new PIXI.Application({transparent: true});
    this.visible = false;

    this.fake_background = document.getElementsByClassName("fake-background")[0];
    this.fake_floor = document.getElementsByClassName("fake-floor")[0];
    this.w = this.fake_background.scrollWidth;
    this.h = this.fake_background.scrollHeight;
    this.PTM = this.w / SIMULATION_WIDTH;

    this.fake_background.appendChild(this.app.view);
    this.app.view.id = 'game-canvas';

    let gravity = new window.b2Vec2(GRAVITY[0], GRAVITY[1]);
    this.world = new window.b2World(gravity);
    window.world = this.world;
    this.createParticleSystem();
    this.my_tornado = Object.assign({}, TORNADO);

    this.defaultContainer = new PIXI.Container();
    this.app.stage.addChild(this.defaultContainer);
    this.accumulator = TARGET_MS; // To allow the first update to be done
    this.sprites = [];
    this.createWalls(SIMULATION_WIDTH, WALL_THICKNESS, WALL_LENGTH, WALL_MARGIN);

    // Sync Pixi with Liquidfun
    PIXI.Ticker.shared.add(this.update.bind(this), 75);

    // Show the canvas only when the physics are completely loaded
    this.app.view.style.opacity = '0';

    window.addEventListener('resize', this.onResize.bind(this));
    this.app.view.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.app.view.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.app.view.addEventListener("mousemove", this.updateMouseCoords.bind(this));

    // Everything has been properly loaded
    this.allLoaded = true;
    this.onResize();

    this.spawnParticles(0, -SEA_DEPTH, SIMULATION_WIDTH/2, SEA_DEPTH);
    this.spawnBoat(0, -this.h/this.PTM -20, 4, 3.488);
    this.randomizeParticleIndexes();
  }

  updateMouseCoords(e) {
    this.mouseX = ((e.clientX - this.app.view.offsetLeft) - this.app.view.scrollWidth/2) / this.PTM;
    this.mouseY = -(-(e.clientY - this.app.view.offsetTop) + this.app.view.scrollHeight) / this.PTM;
  }

  onMouseDown(e) {
    if (!this.allLoaded) return null;

    this.updateMouseCoords(e);
    this.my_tornado = Object.assign({}, TORNADO);
    this.my_tornado.active = true;
  }

  onMouseUp(e) {
    if (!this.allLoaded) return null;

    this.my_tornado.active = false;
  }

  onResize() {
    if (!this.allLoaded) return null;

    this.w = this.fake_background.scrollWidth;
    this.h = this.fake_background.scrollHeight;
    this.PTM = this.w/SIMULATION_WIDTH;
    this.app.renderer.resize(this.w, this.h);
    this.app.stage.position.set(this.w/2, this.h);

    this.particleContainer.setPTM(this.PTM);

    // Update sprite sizes
    this.sprites.forEach(function(sprite, i, array){
      sprite.width = sprite.bodyWidth*this.PTM*2;
      sprite.height = sprite.bodyHeight*this.PTM*2;
      let pos = sprite.body.GetPosition();
      sprite.position.set(pos.x * this.PTM, pos.y * this.PTM);
      sprite.rotation = sprite.body.GetAngle();
    }.bind(this));
  }

  // Updates the physics and graphics. Called by PIXI.Ticker.shared
  update() {
    if (!this.allLoaded || !document.hasFocus()) return null;

    // Using an accumulator to guarantee (as much as possible)
    // physics stability even with low framerates
    this.accumulator += PIXI.Ticker.shared.elapsedMS;
    while (this.accumulator >= TARGET_MS) {
      this.world.Step(TARGET_MS/1000, 8, 3);
      this.accumulator -= TARGET_MS;
    }

    // Sync the sprites with their physical bodies
    this.sprites.forEach(function(sprite, i, array){
      let pos = sprite.body.GetPosition();
      sprite.position.set(pos.x * this.PTM, pos.y * this.PTM);
      sprite.rotation = sprite.body.GetAngle();
    }.bind(this));

    this.updateTornado();

    if (!this.visible) {
      this.app.view.classList.add("visible-canvas");
      this.visible = true;
    }
  }

  createParticleSystem() {
    let psd = new window.b2ParticleSystemDef();
    psd.radius = PARTICLE_SIZE;
    this.particleSystem = this.world.CreateParticleSystem(psd);
    this.particleContainer = new LiquidfunContainer();
    this.particleContainer.setup(this.particleSystem, this.PTM, COLOR)
    this.app.stage.addChild(this.particleContainer);
  }

  spawnParticles(x, y, w, h) {
    let pgd = new window.b2ParticleGroupDef();
    let shape = new window.b2PolygonShape();
    shape.SetAsBoxXY(w, h);
    pgd.shape = shape;
    pgd.flags = window.b2_tensileParticle;
    pgd.position = new window.b2Vec2(x, y);
    pgd.strength = 0.1;
    let group = this.particleSystem.CreateParticleGroup(pgd);

    //Update the particle sprites container
    this.particleContainer.updateCount();
    return group;
  }


  createBox(x, y, w, h, fixed, createSprite=true) {
    let bd = new window.b2BodyDef();
    bd.position = new window.b2Vec2(x, y);
    if (!fixed) bd.type = 2;
    let body = this.world.CreateBody(bd);

    let shape = new window.b2PolygonShape();
    shape.SetAsBoxXY(w, h);
    body.CreateFixtureFromShape(shape, 0.3);

    if (!createSprite) return body;

    let sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
    sprite.tint = COLOR;
    sprite.anchor.set(0.5);

     //Used to keep sprite ratio on window resize
    sprite.bodyWidth = w;
    sprite.bodyHeight = h;

    sprite.width = w * this.PTM * 2;
    sprite.height = h * this.PTM * 2;
    sprite.position.set(x * this.PTM * 2, y * this.PTM * 2);
    sprite.body = body;
    this.defaultContainer.addChild(sprite);
    this.sprites.push(sprite);

    return body;
  }

  spawnBoat(x, y, w, h) {
    let b2Vec2 = window.b2Vec2;
    let bd = new window.b2BodyDef();
    bd.position = new b2Vec2(x, y);
    bd.type = 2;
    let body = this.world.CreateBody(bd);

    //Floor
    let shape = new window.b2PolygonShape();
    shape.SetAsBoxXYCenterAngle(w/1.4, h/5, new b2Vec2(0, h/1.3), 0);
    body.CreateFixtureFromShape(shape, 0.2);

    //Mast
    shape.SetAsBoxXYCenterAngle(w/7, h/1.7, new b2Vec2(0, -h/4), 0);
    body.CreateFixtureFromShape(shape, 0.2);

    //Right side
    shape.SetAsBoxXYCenterAngle(w/6, h/3, new b2Vec2(w/1.7, h/2), Math.PI/4);
    body.CreateFixtureFromShape(shape, 0.3);

    //Left side
    shape.SetAsBoxXYCenterAngle(w/6, h/3, new b2Vec2(-w/1.7, h/2), -Math.PI/4);
    body.CreateFixtureFromShape(shape, 0.3);

    let sprite = PIXI.Sprite.from(BoatImage);
    sprite.anchor.set(0.5);

    sprite.bodyWidth = w;
    sprite.bodyHeight = h;

    sprite.width = w * this.PTM * 2;
    sprite.height = h * this.PTM * 2;
    sprite.position.set(x * this.PTM * 2, y * this.PTM * 2);
    sprite.body = body;
    this.defaultContainer.addChild(sprite);
    this.sprites.push(sprite);
    this.boat = sprite;

    return body;
  }

  createWalls(width, thickness, length, margin) {
    this.walls = [this.createBox(0, thickness +margin, length, thickness, true, false)]; //Bottom
    this.walls[1] = this.createBox(width/2+thickness +margin, 0, thickness, length, true, false); //Right
    this.walls[2] = this.createBox(-width/2-thickness -margin, 0, thickness, length, true, false); //Left
  }

  updateTornado() {
    if (this.my_tornado.active) {
      this.my_tornado.size += this.my_tornado.growth*this.my_tornado.size*PIXI.Ticker.shared.elapsedMS/1000;
      if (this.my_tornado.speed < this.my_tornado.maxSpeed)
        this.my_tornado.speed += this.my_tornado.growth/3*this.my_tornado.speed*PIXI.Ticker.shared.elapsedMS/1000;

      this.my_tornado.x = this.mouseX;
      this.my_tornado.y = this.mouseY;

      let posBuf = this.particleSystem.GetPositionBuffer();
      let velBuf = this.particleSystem.GetVelocityBuffer();
      for (let i = 0; i < this.my_tornado.size; i++) {
        //Perpendicular vector
        let vX = this.my_tornado.y - posBuf[i*2+1];
        let vY = - (this.my_tornado.x - posBuf[i*2]);

        //Rotate it to get the tornade effect
        vX = Math.cos(this.my_tornado.angle)*vX - Math.sin(this.my_tornado.angle)*vY;
        vY = Math.sin(this.my_tornado.angle)*vX + Math.cos(this.my_tornado.angle)*vY;

        let magnitude = Math.sqrt(Math.pow(vX,2) + Math.pow(vY,2));
        vX = (vX/magnitude) * this.my_tornado.speed;
        vY = (vY/magnitude) * this.my_tornado.speed;

        velBuf[i*2] = vX;
        velBuf[i*2+1] = vY;
      }
    }
  }

  randomizeParticleIndexes() {
    let fixedCount = this.particleSystem.GetParticleCount()/2;
    let posBuf = this.particleSystem.GetPositionBuffer();
    let velBuf = this.particleSystem.GetVelocityBuffer();

    for (let i=0; i<fixedCount; i++) {
      let rnd = Math.floor(Math.random()*(fixedCount+1));

      //Swap positions
      let tempX = posBuf[i*2];
      let tempY = posBuf[i*2+1];
      posBuf[i*2] = posBuf[rnd*2];
      posBuf[i*2+1] = posBuf[rnd*2+1];
      posBuf[rnd*2] = tempX;
      posBuf[rnd*2+1] = tempY;

      //Swap velocities
      tempX = velBuf[i*2];
      tempY = velBuf[i*2+1];
      velBuf[i*2] = velBuf[rnd*2];
      velBuf[i*2+1] = velBuf[rnd*2+1];
      velBuf[rnd*2] = tempX;
      velBuf[rnd*2+1] = tempY;
    }
  }
}

export default Game;
