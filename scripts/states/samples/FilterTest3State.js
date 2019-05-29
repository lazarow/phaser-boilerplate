import SplashState from './../SplashState';

class FilterTest3State extends Phaser.State
{
    preload() {
        this.game.stage.backgroundColor = '#F0C873';
        this.game.load.image('diffuse', '{ASSETS_PATH}/images/samples/filter-test3/diffuse.png');
        this.game.load.image('light', '{ASSETS_PATH}/images/samples/filter-test3/light.png');
    }
    create() {
        const sprite1 = this.game.add.sprite(0, 0, 'diffuse');
        const sprite2 = this.game.add.sprite(288, 0, 'light');
        const filter = new Phaser.Filter(this.game, {
            iChannel0: { type: 'sampler2D', value: sprite2.texture, textureData: { repeat: false } }
        }, `
precision mediump float;
varying vec2 vTextureCoord;
uniform vec2 resolution;        
uniform sampler2D uSampler;
uniform sampler2D iChannel0;
void main( void ) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 texColor = texture2D(iChannel0, vec2(0.0, 1.0 - uv.y));
    gl_FragColor = texColor;
}
`);
        sprite1.filters = [filter]
    }
}

export default FilterTest3State;
