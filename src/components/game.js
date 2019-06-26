import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import Script from 'react-load-script'

// Define PIXI in the global context so the liquidfun Renderer
// can use it
window.PIXI = PIXI;

// Elapsed time between frames
const TARGET_MS = 1000/60;
const MAX_MS = 1000/30;

// Simulation parameters
const PTM = 30; //Pixels per meter
const MAX_PARTICLES = 500;
const GRAVITY = [0, -9.81];

class Game extends Component {
  constructor(props) {
    super(props);

    this.app = new PIXI.Application({width: 800, height: 600, transparent: true});
    this.app.renderer.autoResize = false;
    this.app.stage.position.x = 800/2;
    this.app.stage.position.y = 600/2;

    // Liquidfun load
    const liquidfunScript = document.createElement("script");
    liquidfunScript.src = "scripts/liquidfun.js";
    liquidfunScript.asyn = 'true';
    document.body.appendChild(liquidfunScript);
  }

  componentDidMount() {
    // Pixi initialization
    this.fake_background = document.getElementsByClassName("fake-background")[0];
    this.fake_background.appendChild(this.app.view);
    this.app.view.id = 'game-canvas';
  }

  render() {
    return (<>
              <Script
                url="scripts/liquidfun.js"
                onLoad={this.setup.bind(this)}
              />
              <Script url="scripts/liquidfun-renderer.js"/>
            </>)
  }


  // --- GAME LOGIC ---

  // Sets up liquidfun and Pixi and makes
  // them work together
  setup() {
    let gravity = new window.b2Vec2(GRAVITY[0], GRAVITY[1]);
    this.world = new window.b2World(gravity);
    window.world = this.world;
    this.createParticleSystem();

    this.accumulator = 0;
    this.sprites = [];

    // Sync Pixi with Liquidfun in its update object
    PIXI.Ticker.shared.add(this.update.bind(this));

    // Show the canvas only when the physics are completely loaded
    this.app.view.style.opacity = '1';

    this.app.view.addEventListener('click', this.onClickHandler.bind(this));
  }

  onClickHandler(e) {
    let x = ((e.clientX - this.app.view.offsetLeft) - this.app.view.scrollWidth/2) / PTM;
    let y = -(-(e.clientY - this.app.view.offsetTop) + this.app.view.scrollHeight/2) / PTM;

    //this.spawnParticles(1, x, y);
    this.createBox(x, y, 1, 1);
  }

  // Updates the physics and graphics. Called by PIXI.Ticker.shared
  update() {
    // Using an accumulator to guarantee (as much as possible)
    // physics stability even with low framerates
    this.accumulator += PIXI.Ticker.elapsedMS;
    while (this.accumulator >= TARGET_MS) {
      this.world.Step(TARGET_MS/1000, 8, 3);
      this.accumulator -= TARGET_MS;
    }

    // Sync the sprites with their physical bodies
    this.sprites.forEach(function(sprite, i, array){
      let pos = sprite.body.GetPosition();
      sprite.position.set(pos.x * PTM, pos.y * PTM);
      sprite.rotation = -sprite.body.GetAngle();
    });
  }


  createParticleSystem() {
    let psd = new window.b2ParticleSystemDef();
    psd.radius = 0.1;
    this.particleSystem = this.world.CreateParticleSystem(psd);
    //this.particleSystem.SetMaxParticleCount(MAX_PARTICLES);

    let dummy = PIXI.Sprite.from(PIXI.Texture.EMPTY);
    this.app.stage.addChild(dummy);

    this.particleSystemSprite = new window.LiquidfunSprite(this.particleSystem, this.app);
    this.app.stage.addChild(this.particleSystemSprite);
  }

  spawnParticles(radius, x, y) {
    if (this.particleSystem.GetParticleCount() >= MAX_PARTICLES)
      return null;

    let color = new window.b2ParticleColor(0, 0, 255, 255);
    // flags
    let flags = (0<<0);

    let pgd = new window.b2ParticleGroupDef();
    let shape = new window.b2CircleShape();
    shape.radius = radius;
    pgd.shape = shape;
    pgd.color = color;
    pgd.flags = flags;
    shape.position = new window.b2Vec2(x, y);
    let group = this.particleSystem.CreateParticleGroup(pgd);

    //console.log("Particles spawned!");
    return group;
  }


createBox(x, y, w, h) {
    let bd = new window.b2BodyDef();
    bd.position = new window.b2Vec2(x, y);

    let body = this.world.CreateBody(bd);

    let shape = new window.b2PolygonShape;
    shape.SetAsBoxXY(w, h);
    body.CreateFixtureFromShape(shape, 1.0);

    let sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
    // dunno why this has to be times 2
    sprite.width = w * PTM * 2;
    sprite.height = h * PTM * 2;
    sprite.anchor.set(0.5);
    sprite.body = body;
    this.app.stage.addChild(sprite);
    this.sprites.push(sprite);
    return body;
  }
}

export default Game;
