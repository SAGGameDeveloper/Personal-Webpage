import * as PIXI from 'pixi.js'
import ParticleSprite from '../images/particle.png'

function LiquidfunRenderer(renderer) {
    PIXI.ParticleRenderer.call(this, renderer);
    this.renderer  = renderer;

    this.particleSystem = null;
    this.container = new PIXI.ParticleContainer();
}

LiquidfunRenderer.prototype = Object.create(PIXI.ParticleRenderer.prototype);
LiquidfunRenderer.prototype.constructor = LiquidfunRenderer;

LiquidfunRenderer.prototype.render = function () {
  // Sync with liquidfun particle system
  if (this.particleSystem === null) return;

  let count = this.particleSystem.GetParticleCount();
  if (count !== this.container.children.length) this.updateCount();

  for (let i = 0; i < count; i++) {

  }

  PIXI.ParticleRenderer.prototype.render.call(this, this.container);
}

LiquidfunRenderer.prototype.setParticleSystem = function(particleSystem) {
  this.particleSystem = particleSystem;

  let count = this.particleSystem.GetParticleCount();
  for (let i = 0; i < count; i++) {
    let particle_sprite = PIXI.Sprite.from(ParticleSprite);
    particle_sprite.position.set(0, 0);
    this.container.addChild(particle_sprite);
  }
}

LiquidfunRenderer.prototype.updateCount = function() {

}

export default LiquidfunRenderer;
