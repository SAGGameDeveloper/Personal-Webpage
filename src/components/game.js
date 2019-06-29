// This code is based on: https://github.com/doebi/liquidfun.js-demo

import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import Script from 'react-load-script'
import LiquidfunContainer from '../utils/liquidfun_container'

// Elapsed time between frames
const TARGET_MS = 1000/60;

// Simulation parameters
const PTM = 30; //Pixels per meter
const PARTICLE_SIZE = 0.15;
const GRAVITY = [0, 9.81];
const COLOR = 0xE6DABC;
const WALL_THICKNESS = 10;
const WALL_LENGTH = 200;
const SEA_DEPTH = 1.2;
const WALL_MARGIN = 0.1;

const TORNADO = {
  x: 0,
  y: 0,
  active: false,

  growth: 0.1,
  speed: 10,
  maxSpeed: 60,
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
    this.app = new PIXI.Application({width: 1000, height: 1000, transparent: true});

    this.fake_background = document.getElementsByClassName("fake-background")[0];
    this.fake_floor = document.getElementsByClassName("fake-floor")[0];
    this.floor_removed = false;
    this.w = this.fake_background.scrollWidth;
    this.h = this.fake_background.scrollHeight;

    this.fake_background.appendChild(this.app.view);
    this.app.view.id = 'game-canvas';

    let gravity = new window.b2Vec2(GRAVITY[0], GRAVITY[1]);
    this.world = new window.b2World(gravity);
    window.world = this.world;
    this.createParticleSystem();
    this.my_tornado = Object.assign({}, TORNADO);
    this.app.view.addEventListener("mousemove", this.updateMouseCoords.bind(this));

    this.defaultContainer = new PIXI.Container();
    this.app.stage.addChild(this.defaultContainer);
    this.accumulator = 0;
    this.sprites = [];
    this.createWalls(this.w/PTM, this.h/PTM, WALL_THICKNESS, WALL_LENGTH);

    // Sync Pixi with Liquidfun
    PIXI.Ticker.shared.add(this.update.bind(this));

    // Show the canvas only when the physics are completely loaded
    this.app.view.style.opacity = '1';

    this.app.view.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));

    // Everything has been properly loaded
    this.allLoaded = true;
    this.onResize();
    this.spawnParticles(0, -SEA_DEPTH, this.w/2/PTM, SEA_DEPTH);
  }

  updateMouseCoords(e) {
    this.mouseX = ((e.clientX - this.app.view.offsetLeft) - this.app.view.scrollWidth/2) / PTM;
    this.mouseY = -(-(e.clientY - this.app.view.offsetTop) + this.app.view.scrollHeight) / PTM;
  }

  onClick(e) {
    if (!this.allLoaded) return null;

    this.updateMouseCoords(e);
    this.my_tornado = Object.assign({}, TORNADO);
    this.my_tornado.active = !this.my_tornado.active;
  }

  onResize() {
    if (!this.allLoaded) return null;

    this.w = this.fake_background.scrollWidth;
    this.h = this.fake_background.scrollHeight;
    this.app.renderer.resize(this.w, this.h);

    this.repositionWalls(this.w/PTM, this.h/PTM);

    this.app.stage.position.set(this.w/2, this.h);
  }

  // Updates the physics and graphics. Called by PIXI.Ticker.shared
  update() {
    if (!this.allLoaded) return null;

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
      sprite.position.set(pos.x * PTM, pos.y * PTM);
      sprite.rotation = sprite.body.GetAngle();
    });

    this.updateTornado();
  }

  createParticleSystem() {
    let psd = new window.b2ParticleSystemDef();
    psd.radius = PARTICLE_SIZE;
    this.particleSystem = this.world.CreateParticleSystem(psd);
    this.particleContainer = new LiquidfunContainer();
    this.particleContainer.setup(this.particleSystem, PTM, COLOR)
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
    return group;
  }


  createBox(x, y, w, h, fixed, createSprite=true) {
    let bd = new window.b2BodyDef();
    bd.position = new window.b2Vec2(x, y);
    if (!fixed) bd.type = 2;
    let body = this.world.CreateBody(bd);

    let shape = new window.b2PolygonShape();
    shape.SetAsBoxXY(w, h);
    body.CreateFixtureFromShape(shape, 0.5);

    if (!createSprite) return body;

    let sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
    sprite.tint = COLOR;
    sprite.anchor.set(0.5);
    sprite.width = w * PTM * 2;
    sprite.height = h * PTM * 2;
    sprite.position.set(x * PTM * 2, y * PTM * 2);
    sprite.body = body;
    this.defaultContainer.addChild(sprite);
    this.sprites.push(sprite);

    return body;
  }

  createWalls(width, height, thickness, length) {
    this.walls = [this.createBox(0, thickness+WALL_MARGIN, length, thickness, true)]; //Bottom
    this.walls[1] = this.createBox(width/2+thickness+WALL_MARGIN, -height, thickness, length, true); //Right
    this.walls[2] = this.createBox(0, -height-thickness-WALL_MARGIN, length, thickness, true); //Top
    this.walls[3] = this.createBox(-width/2-thickness-WALL_MARGIN, -height, thickness, length, true); //Left
  }

  repositionWalls(width, height) {
    let b2Vec2 = window.b2Vec2;
    this.walls[1].SetTransform(new b2Vec2(width/2+WALL_THICKNESS+WALL_MARGIN, -height), 0);
    this.walls[2].SetTransform(new b2Vec2(0, -height-WALL_THICKNESS-WALL_MARGIN), 0);
    this.walls[3].SetTransform(new b2Vec2(-width/2-WALL_THICKNESS-WALL_MARGIN, -height), 0);
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
}

export default Game;
