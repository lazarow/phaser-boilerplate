import Stats from 'stats.js';
import SplashState from 'states/SplashState';
// SAMPLES BEGIN - remove this part when u start working on a project
import FilterTest1State from 'states/samples/FilterTest1State';
import FilterTest2State from 'states/samples/FilterTest2State';
import FilterTest3State from 'states/samples/FilterTest3State';
// SAMPLES END

let WIDTH = 480;
let HEIGHT = 270;

class Game extends Phaser.Game
{
	constructor() {
		super(WIDTH, HEIGHT, Phaser.AUTO, 'content', null);
        this.ENV = '{{ENV}}';
		this.state.add('SplashState', SplashState, false);
        if (this.ENV === 'dev') {
            this.setupStatsJS();
            // SAMPLES BEGIN - remove this part when u start working on a project
            this.state.add('FilterTest1State', FilterTest1State, false);
            this.state.add('FilterTest2State', FilterTest2State, false);
            this.state.add('FilterTest3State', FilterTest3State, false);
            // SAMPLES END
            const urlParams = new URLSearchParams(window.location.search);
            const initialState = urlParams.get('state') || 'SplashState';
            this.state.start(initialState);
        } else {
            this.state.start('SplashState');
        }
	}
    setupStatsJS() {
        const stats = new Stats();
        document.body.appendChild(stats.dom);
        const updateLoop = this.update;
        this.update = (...args) => {
            stats.begin();
            updateLoop.apply(this, args);
            stats.end();
        };
    }
    resizeGame(width, height) {
        this.scale.setGameSize(width, height);
        WIDTH = width;
        HEIGHT = height;
        resize();
    }
}

const game = new Game();
function resize() {
    const scalex = Math.floor(window.innerWidth / WIDTH);
    const scaley = Math.floor(window.innerHeight / HEIGHT);
    const scale = Math.min(scalex, scaley);
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.setUserScale(scale, scale);
    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);
    document.getElementById('content').className = 'resized';
    document.getElementById('content').style.marginLeft = '-' + Math.floor(WIDTH * scale / 2) + 'px';
    document.getElementById('content').style.marginTop = '-' + Math.floor(HEIGHT * scale / 2) + 'px';
    document.getElementById('content-placeholder').style.width = (WIDTH * scale) + 'px';
    document.getElementById('content-placeholder').style.height = (HEIGHT * scale) + 'px';
}﻿;
window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);
