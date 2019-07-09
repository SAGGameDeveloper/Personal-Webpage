// I use GetParticleCount() divided by 2 to avoid a Liquidfun
// known bug, where GetParticleCount returns twice what it should, see
// https://github.com/google/liquidfun/issues/50

import isNode from 'detect-node'
import * as PIXI from 'pixi.js'
import ParticleImage from '../images/particle.png'
import AlphaThresholdFilter from '../utils/filter-alpha-threshold.js'
import {ColorReplaceFilter} from '@pixi/filter-color-replace';
import {GlowFilter} from '@pixi/filter-glow';

const MIN_RADIUS = 5;

function LiquidfunContainer() {
    PIXI.Container.call(this);
    this.radius = 1;
    this.fixedCount = 0;

    this.texture = PIXI.Texture.from(ParticleImage);
    this.particleSystem = null;
}

if (!isNode)
LiquidfunContainer.prototype = Object.create(PIXI.Container.prototype);
LiquidfunContainer.prototype.constructor = LiquidfunContainer;

LiquidfunContainer.prototype.setup = function(particleSystem, PTM, color) {
  this.particleSystem = particleSystem;
  this.PTM = PTM;
  this.color = color;
  this.radius = Math.max(this.particleSystem.radius * PTM, MIN_RADIUS);

  this.filters = [new PIXI.filters.BlurFilter(5, 5, 1, 11),
                  new AlphaThresholdFilter(0.85),
                  new ColorReplaceFilter(0x000000, this.color, 1),
                  new GlowFilter(25, 2.5, 0, this.color, 0.1)];
}

LiquidfunContainer.prototype.setPTM = function(PTM){
  this.PTM = PTM;

  // Update sizes accordingly
  this.radius = Math.max(this.particleSystem.radius * PTM, MIN_RADIUS);
  for (let i = 0; i < this.fixedCount; i++) {
    this.children[i].width = this.children[i].height = this.radius*4;
  }
}

LiquidfunContainer.prototype.render = function (renderer) {
  // Sync with liquidfun particle system
  if (this.particleSystem === null) return;

  this.updateParticlePos();

  PIXI.Container.prototype.render.call(this, renderer);
}

LiquidfunContainer.prototype.updateParticlePos = function () {
  let pos = this.particleSystem.GetPositionBuffer();
  for (let i = 0; i < this.fixedCount; i++) {
    this.children[i].position.set(pos[i*2]*this.PTM, pos[i*2+1]*this.PTM);
  }
}

LiquidfunContainer.prototype.updateCount = function() {
  this.fixedCount = this.particleSystem.GetParticleCount()/2;
  let spriteCount = this.children.length;

  if (this.fixedCount < spriteCount) this.removeChildren(this.fixedCount, spriteCount);
  else if (this.fixedCount > spriteCount) this.addParticles(this.fixedCount - spriteCount);

  return this.fixedCount;
}

LiquidfunContainer.prototype.addParticles = function(n) {
  for (let i = 0; i < n; i++) {
    let particle_sprite = new PIXI.Sprite(this.texture);
    particle_sprite.width = particle_sprite.height = this.radius*4;
    particle_sprite.blendMode = PIXI.BLEND_MODES.NORMAL;
    particle_sprite.anchor.set(0.5);
    this.addChild(particle_sprite);
  }
}

export default LiquidfunContainer;
