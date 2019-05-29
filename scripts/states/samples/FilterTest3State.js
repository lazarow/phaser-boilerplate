import SplashState from './../SplashState';

class FilterTest3State extends Phaser.State
{
    preload() {
        this.game.stage.backgroundColor = '#F0C873';
        this.game.load.image('diffuse', '{ASSETS_PATH}/images/samples/filter-test3/diffuse.png');
        this.game.load.image('light', '{ASSETS_PATH}/images/samples/filter-test3/light.png');
    }
    create() {
        const sprite = this.game.add.sprite(0, 0, 'diffuse');
        const light = this.game.add.sprite(0, 0, 'light');
        light.visible = false;
        const filter1 = new Phaser.Filter(this.game, {
            iChannel0: { type: 'sampler2D', value: light.texture, textureData: { repeat: false } }
        }, `
precision mediump float;
varying vec2 vTextureCoord;
uniform vec2 resolution;        
uniform sampler2D uSampler;
uniform sampler2D iChannel0;
void main( void ) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 texColor = texture2D(iChannel0, vec2(uv.x, 1.0 - uv.y));
    if (texColor.a > 0.0) {
        gl_FragColor = vec4(
            texColor.r * 0.2 + gl_FragColor.r * 0.8,
            texColor.g * 0.2 + gl_FragColor.g * 0.8,
            texColor.b * 0.2 + gl_FragColor.b * 0.8,
            gl_FragColor.a
        );
    }
}
`);
        const filter2 = new Phaser.Filter(this.game, {
            iChannel0: { type: 'sampler2D', value: light.texture, textureData: { repeat: false } }
        }, `
precision mediump float;
varying vec2 vTextureCoord;
uniform vec2 resolution;        
uniform sampler2D uSampler;
uniform sampler2D iChannel0;
void main( void ) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 texColor = texture2D(iChannel0, vec2(uv.x, 1.0 - uv.y));
    if (texColor.a > 0.0) {
        gl_FragColor = texColor * gl_FragColor + gl_FragColor * 1.0;
    }
}
`);
        filter1.setResolution(256, 256);
        filter2.setResolution(256, 256);
        sprite.filters = [filter2];
    }
}

export default FilterTest3State;
