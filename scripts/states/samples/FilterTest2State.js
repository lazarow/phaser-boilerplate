import SplashState from './../SplashState';

class FilterTest2State extends Phaser.State
{
    preload() {
        this.game.stage.backgroundColor = '#F0C873';
        this.game.load.image('rock', '{ASSETS_PATH}/images/samples/filter-test2/rock.png');
    }
    create() {
        const rock = this.game.add.sprite(0, 0, 'rock');
        const filter = new Phaser.Filter(this.game, {
            iChannel0: { type: 'sampler2D', value: rock.texture, textureData: { repeat: false } }
        }, `
precision mediump float;
varying vec2 vTextureCoord;
uniform vec2 resolution;
uniform sampler2D uSampler;
uniform sampler2D iChannel0;
void main( void ) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`);
        rock.filters = [filter];
    }
}

export default FilterTest2State;
