import Stats from 'stats.js';
import GameState from 'states/GameState';

class Game extends Phaser.Game
{
	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
        this.ENV = '{{ENV}}';
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
        if (this.ENV === 'dev') {
            this.setupStatsJS();
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

new Game();
