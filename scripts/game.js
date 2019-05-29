import Stats from 'stats.js';
import SplashState from 'states/SplashState';
import FilterTestState from 'states/FilterTestState';

const WIDTH = 480;
const HEIGHT = 270;

class Game extends Phaser.Game
{
	constructor() {
		super(WIDTH, HEIGHT, Phaser.AUTO, 'content', null);
        this.ENV = '{{ENV}}';
		this.state.add('SplashState', SplashState, false);
		this.state.add('FilterTestState', FilterTestState, false);
        if (this.ENV === 'dev') {
            this.setupStatsJS();
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
