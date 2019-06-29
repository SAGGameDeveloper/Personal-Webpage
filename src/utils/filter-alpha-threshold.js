import * as PIXI from 'pixi.js'

function AlphaThresholdFilter (minimum_alpha) {
  const fragment = `
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform float minimum_alpha;

    void main(void)
    {
      vec4 sample = texture2D(uSampler, vTextureCoord);

      if (sample.a < minimum_alpha) discard;

      gl_FragColor = vec4(vec3(sample), 1);
    }`;

  this.minimum_alpha = minimum_alpha;
  PIXI.Filter.call(this, PIXI.Filter.defaultVertexSrc, fragment, {minimum_alpha: this.minimum_alpha});

  this.blendMode = PIXI.BLEND_MODES.MULTIPLY;
}

AlphaThresholdFilter.prototype = Object.create(PIXI.Filter.prototype);
AlphaThresholdFilter.prototype.constructor = AlphaThresholdFilter;

export default AlphaThresholdFilter;
