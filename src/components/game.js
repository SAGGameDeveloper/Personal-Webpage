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
const PHYSICS_MS = TARGET_MS*2;

// Simulation
const SIMULATION_WIDTH = 30;
const PARTICLE_SIZE = 0.17;
const GRAVITY = [0, 9.81];

// Walls
const WALL_THICKNESS = 20;
const WALL_LENGTH = 250;
const SEA_DEPTH = 2;
const WALL_MARGIN = 0.1;

// Boat
const BOAT_WIDTH = 3;
const BOAT_HEIGHT = 2.616;

// Graphics
const COLOR = 0xe6dabc;
const DOM_PARENT = 'layout';

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

  render() { // Initialize the setup once Liquidfun has been loaded
    return (<>
              <Script
                url="/scripts/liquidfun.js"
                onLoad={ this.setup.bind(this) }
              />

              <div className="disableButton" onClick={ this.end.bind(this) }>
                <span className="disable-span"> DISABLE GAME </span>
              </div>
            </>)
  }



  // --- GAME LOGIC ---

  // Initializes libraries and starts the game
  setup() {
    // Initializations
    this.initGraphics();
    this.initPhysics();
    this.setupBindings();

    // Everything has been properly loaded
    this.allLoaded = true;

    // Set initial sizes properly and initialize the game
    this.onResize();
    this.initGame();
  }

  end() {
    this.allLoaded = false;

    this.bindingsCleanup();
    this.physicsCleanup();
    this.graphicsCleanup();

    let disableButton = document.getElementsByClassName('disableButton')[0];
    disableButton.classList.add('disableButtonInvisible');
  }

  initGraphics() {
    // Pixi initialization
    this.app = new PIXI.Application({transparent: true, sharedTicker: true});
    this.app.view.id = 'game-canvas';

    this.parent_div = document.getElementById(DOM_PARENT);
    this.parent_div.appendChild(this.app.view);

    this.sprites = [];
    this.spritesContainer = new PIXI.Container();
    this.app.stage.addChild(this.spritesContainer);
  }

  initPhysics() {
    let gravity = new window.b2Vec2(GRAVITY[0], GRAVITY[1]);
    this.world = new window.b2World(gravity);
    window.world = this.world;

    // Initializing the accumulator to PHYSICS_MS avoids
    // skipping the first physics update
    this.accumulator = PHYSICS_MS;
  }

  initGame() {
    // Spawn objects
    this.createParticleSystem();
    this.spawnParticles(0, -SEA_DEPTH, SIMULATION_WIDTH/2, SEA_DEPTH);
    this.spawnBoat(0, -this.h/this.PTM -20, BOAT_WIDTH, BOAT_HEIGHT);
    this.createWalls(SIMULATION_WIDTH, WALL_THICKNESS,
                      WALL_LENGTH, WALL_MARGIN);
    this.my_tornado = Object.assign({}, TORNADO);

    // Randomize indexes to avoid the tornado being too linear
    this.randomizeParticleIndexes();

    // Make one first update with the canvas still invisible,
    // avoiding initial graphic glitches and slowdowns
    this.update();
    this.app.view.classList.add("visible-canvas");
  }

  setupBindings() {
    // Setup a custom update with high priority for the game logic
    PIXI.Ticker.shared.add(this.update.bind(this), 75);

    window.addEventListener('resize', this.onResize.bind(this));

    // Tornado controls
    this.app.view.addEventListener("mousedown",
                                      this.tornadoControl.bind(this));
    this.app.view.addEventListener("mouseup",
                                      this.tornadoControl.bind(this));
    this.app.view.addEventListener("mousemove",
                                      this.updateMouseCoords.bind(this));

    // Tornado touchscreen compatibility
    this.app.view.addEventListener("touchstart",
                                      this.tornadoControl.bind(this));
  }

  physicsCleanup() {
    // Destroy every body
    while (this.world.bodies.length > 0)
      this.world.DestroyBody(this.world.bodies[0]);

    // Destroy every particle system
    while (this.world.particleSystems.length > 0)
      this.world.DestroyParticleSystem(this.world.particleSystems[0]);
  }

  graphicsCleanup() {
    // Remove the canvas from the DOM
    this.parent_div.removeChild(this.app.view);

    // Destroy every container and its sprites
    this.spritesContainer.destroy(true);
    this.particleContainer.destroy(true);

    // Destroy every texture
    Object.keys(PIXI.utils.TextureCache).forEach(function(texture) {
        PIXI.utils.TextureCache[texture].destroy(true);
      });

    // Stop and destroy the ticker before destroying the app,
    // or else it would keep requesting animation frames in the
    // background
    this.app.ticker.stop();
    this.app.ticker.destroy();
    this.app.destroy(true);
  }

  bindingsCleanup() {
    window.removeEventListener('resize', this.onResize.bind(this));
    this.app.view.removeEventListener("mousedown",
                                      this.tornadoControl.bind(this));
    this.app.view.removeEventListener("mouseup",
                                      this.tornadoControl.bind(this));
    this.app.view.removeEventListener("mousemove",
                                      this.updateMouseCoords.bind(this));
    this.app.view.removeEventListener("touchstart",
                                      this.tornadoControl.bind(this));
  }

  updateMouseCoords(e) {
    if (!this.allLoaded) return;

    let windowX, windowY;
    if (e.touches) { // Touchscreen compatibility
      windowX = e.touches[0].clientX;
      windowY = e.touches[0].clientY;
    }
    else {
      windowX = e.clientX;
      windowY = e.clientY;
    }

    this.mouseX = ((windowX - this.app.view.offsetLeft)
                    - this.app.view.scrollWidth/2) / this.PTM;
    this.mouseY = -(-(windowY - this.app.view.offsetTop + window.scrollY)
                    + this.app.view.scrollHeight) / this.PTM;
  }

  // Turns the tornado on/off depending on its current state
  tornadoControl(e) {
    if (!this.allLoaded) return null;

    if (!this.my_tornado.active) {
      this.updateMouseCoords(e);
      this.my_tornado = Object.assign({}, TORNADO);
    }

    this.my_tornado.active = !this.my_tornado.active;
  }

  onResize() {
    if (!this.allLoaded) return null;

    // Adjust variable values to the new size
    this.w = this.app.view.scrollWidth;
    this.h = this.app.view.scrollHeight;
    this.PTM = this.w/SIMULATION_WIDTH;

    // Resize whatever needs to be resized
    this.app.renderer.resize(this.w, this.h);
    this.app.stage.position.set(this.w/2, this.h);
    if (this.particleContainer) this.particleContainer.setPTM(this.PTM);

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
    if (!this.allLoaded || !document.hasFocus()
        || window.scrollY > this.app.view.scrollHeight) return null;

    // Using an accumulator to guarantee (as much as possible)
    // physics stability even with low framerates
    let physicsUpdated = false;
    this.accumulator += PIXI.Ticker.shared.elapsedMS;
    while (this.accumulator >= PHYSICS_MS) {
      this.world.Step(PHYSICS_MS/1000, 8, 3);
      this.accumulator -= PHYSICS_MS;

      physicsUpdated = true;
    }

    if (!physicsUpdated) return;

    // Sync the sprites with their physical bodies
    this.sprites.forEach(function(sprite, i, array){
      let pos = sprite.body.GetPosition();
      sprite.position.set(pos.x * this.PTM, pos.y * this.PTM);
      sprite.rotation = sprite.body.GetAngle();
    }.bind(this));

    this.updateTornado();
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
    this.spritesContainer.addChild(sprite);
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
    shape.SetAsBoxXYCenterAngle(w/1.4, h/4, new b2Vec2(0, h/1.4), 0);
    body.CreateFixtureFromShape(shape, 0.1);

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
    this.spritesContainer.addChild(sprite);
    this.sprites.push(sprite);
    this.boat = sprite;

    return body;
  }

  createWalls(width, thickness, length, margin) {
    this.walls = [this.createBox(0, thickness +margin,
                  length, thickness, true, false)]; //Bottom
    this.walls[1] = this.createBox(width/2+thickness +margin, 0,
                    thickness, length, true, false); //Right
    this.walls[2] = this.createBox(-width/2-thickness -margin, 0,
                    thickness, length, true, false); //Left
  }

  updateTornado() {
    if (!this.my_tornado.active) return;

    let t = this.my_tornado;
    let ms = PIXI.Ticker.shared.elapsedMS;
    let fixedCount = this.particleSystem.GetParticleCount()/2;

    // Make it grow
    t.size = Math.min(t.size + t.growth * t.size * ms/1000, fixedCount);
    t.speed = Math.min(t.speed + t.growth/3 * t.speed * ms/1000, t.maxSpeed);

    t.x = this.mouseX;
    t.y = this.mouseY;

    // Update the velocity vector of the particles under the tornado influence
    let posBuf = this.particleSystem.GetPositionBuffer();
    let velBuf = this.particleSystem.GetVelocityBuffer();
    for (let i = 0; i < t.size; i++) {
      // Perpendicular vector
      let vX = t.y - posBuf[i*2+1];
      let vY = - (t.x - posBuf[i*2]);

      // Rotate it to get the tornade effect
      vX = Math.cos(t.angle)*vX - Math.sin(t.angle)*vY;
      vY = Math.sin(t.angle)*vX + Math.cos(t.angle)*vY;

      // Transform the vector to use the given speed
      let magnitude = Math.sqrt(Math.pow(vX,2) + Math.pow(vY,2));
      vX = (vX/magnitude) * t.speed;
      vY = (vY/magnitude) * t.speed;

      velBuf[i*2] = vX;
      velBuf[i*2+1] = vY;
    }
  }

  // Iterates the position and velocity particle buffers switching each
  // particle with another random one.
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
