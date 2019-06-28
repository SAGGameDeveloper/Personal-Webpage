import * as PIXI from 'pixi.js'
import ParticleImage from '../images/particle.png'

function LiquidfunRenderer(renderer) {
    PIXI.ParticleRenderer.call(this, renderer);
    this.renderer  = renderer;
    this.radius = 1;

    this.texture = PIXI.Texture.from(ParticleImage);

    this.count = 0;
    this.particleSystem = null;
    this.container = new PIXI.ParticleContainer();
    this.container.render = function(renderer) {renderer.plugins.LiquidfunRenderer.render(this)};
}

LiquidfunRenderer.prototype = Object.create(PIXI.ParticleRenderer.prototype);
LiquidfunRenderer.prototype.constructor = LiquidfunRenderer;

LiquidfunRenderer.prototype.render = function (particleContainer) {
  // Sync with liquidfun particle system
  if (this.particleSystem === null) return;

  this.updateCount();

  let pos = this.particleSystem.GetPositionBuffer();
  for (let i = 0; i < this.count; i++) {
    particleContainer.children[i].position.set(pos[i*2]*this.PTM, pos[i*2+1]*this.PTM);
  }

  PIXI.ParticleRenderer.prototype.render.call(this, particleContainer);
}

LiquidfunRenderer.prototype.setup = function(particleSystem, stage, PTM) {
  this.particleSystem = particleSystem;
  this.PTM = PTM;
  stage.addChild(this.container);

  this.radius = this.particleSystem.radius * PTM;
}

LiquidfunRenderer.prototype.updateCount = function() {
  this.count = this.particleSystem.GetParticleCount();
  let spriteCount = this.container.children.length;

  if (this.count < spriteCount) this.container.removeChildren(this.count, spriteCount);
  else if (this.count > spriteCount) this.addChildren(this.count - spriteCount);

  return this.count;
}

LiquidfunRenderer.prototype.addChildren = function(n) {
  for (let i = 0; i < n; i++) {
    let particle_sprite = new PIXI.Sprite(this.texture);
    particle_sprite.width = this.radius*2;
    particle_sprite.height = this.radius*2;
    this.container.addChild(particle_sprite);
  }
}

export default LiquidfunRenderer;
