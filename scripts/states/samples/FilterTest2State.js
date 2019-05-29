import SplashState from './../SplashState';

class FilterTest2State extends Phaser.State
{
    preload() {
        this.game.stage.backgroundColor = '#F0C873';
        this.game.load.image('empty', '{ASSETS_PATH}/images/samples/filter-test2/empty.png');
        this.game.load.image('rock', '{ASSETS_PATH}/images/samples/filter-test2/rock.png');
        this.game.load.image('white-bar', '{ASSETS_PATH}/images/samples/filter-test2/white-bar.png');
    }
    create() {
        const sprite1 = this.game.add.sprite(0, 0, 'white-bar');
        const sprite2 = this.game.add.sprite(0, 32, 'empty');
        const sprite3 = this.game.add.sprite(0, 64, 'rock');
        const filter = new Phaser.Filter(this.game, {
        }, `
precision mediump float;
varying vec2 vTextureCoord;
uniform vec2 resolution;        
uniform sampler2D uSampler;
void main( void ) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    gl_FragColor = vec4(1, 0, 0, uv.x);
}
`);
        sprite1.filters = [filter];
        sprite2.filters = [filter];
        sprite3.filters = [filter];
    }
}

export default FilterTest2State;
