import SplashState from './../SplashState';

class FilterTest1State extends SplashState
{
    create() {
        super.create();
        this.game.stage.backgroundColor = '#F0C873';
        this.game.add.image(0, 0, 'chinchilla_games_logo').anchor.set(0.5);
        this.game.add.image(480, 0, 'chinchilla_games_logo').anchor.set(0.5);
        this.game.add.image(480, 270, 'chinchilla_games_logo').anchor.set(0.5);
        this.game.add.image(0, 270, 'chinchilla_games_logo').anchor.set(0.5);
        const filter = new Phaser.Filter(this.game, null, `
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
void main( void ) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    float gray = 0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b;
    gl_FragColor = vec4(gray, gray, gray, gl_FragColor.a);
}
`);
        this.world.filters = [filter];
    }
}

export default FilterTest1State;
