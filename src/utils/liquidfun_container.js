import * as PIXI from 'pixi.js'
import ParticleImage from '../images/particle.png'
import AlphaThresholdFilter from '../utils/filter-alpha-threshold.js'
import {ColorReplaceFilter} from '@pixi/filter-color-replace';

function LiquidfunContainer() {
    PIXI.Container.call(this);
    this.radius = 1;
    this.count = 0;

    this.texture = PIXI.Texture.from(ParticleImage);
    this.particleSystem = null;
}

LiquidfunContainer.prototype = Object.create(PIXI.Container.prototype);
LiquidfunContainer.prototype.constructor = LiquidfunContainer;

LiquidfunContainer.prototype.setup = function(particleSystem, PTM, color) {
  this.particleSystem = particleSystem;
  this.PTM = PTM;
  this.color = color;
  this.radius = this.particleSystem.radius * PTM;

  this.filters = [new PIXI.filters.BlurFilter(5, 5, 1, 11),
                  new AlphaThresholdFilter(0.25),
                  new ColorReplaceFilter(0x000000, this.color, 1)];
}

LiquidfunContainer.prototype.render = function (renderer) {
  // Sync with liquidfun particle system
  if (this.particleSystem === null) return;
  this.updateCount();

  let pos = this.particleSystem.GetPositionBuffer();
  for (let i = 0; i < this.count; i++) {
    this.children[i].position.set(pos[i*2]*this.PTM, pos[i*2+1]*this.PTM);
  }

  PIXI.Container.prototype.render.call(this, renderer);
}

LiquidfunContainer.prototype.updateCount = function() {
  this.count = this.particleSystem.GetParticleCount();
  let spriteCount = this.children.length;

  if (this.count < spriteCount) this.removeChildren(this.count, spriteCount);
  else if (this.count > spriteCount) this.addParticles(this.count - spriteCount);

  return this.count;
}

LiquidfunContainer.prototype.addParticles = function(n) {
  for (let i = 0; i < n; i++) {
    let particle_sprite = new PIXI.Sprite(this.texture);
    particle_sprite.width = this.radius*2;
    particle_sprite.height = this.radius*2;
    particle_sprite.blendMode = PIXI.BLEND_MODES.NORMAL;
    particle_sprite.anchor.set(0.5);
    this.addChild(particle_sprite);
  }
}

export default LiquidfunContainer;
