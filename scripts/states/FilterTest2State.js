import SplashState from './SplashState';

class FilterTest2State extends SplashState
{
    create() {
        this.game.stage.backgroundColor = '#F0C873';
        const chinchilla = this.game.add.sprite(0, 0, 'chinchilla_games_logo');
        const filter = new Phaser.Filter(this.game, null, `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main( void ) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    vec4 pixel = texture2D(uSampler, vec2(0, 0));
    if (pixel == gl_FragColor) {
        gl_FragColor = vec4(1,0,0,1);
    }
}
`);
        chinchilla.filters = [filter];
    }
}

export default FilterTest2State;
