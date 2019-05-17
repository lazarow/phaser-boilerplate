class SplashState extends Phaser.State
{
    preload() {
        this.game.stage.backgroundColor = '#BC0470';
        this.game.load.image('chinchilla_games_logo', '{ASSETS_PATH}/images/chinchilla_games_logo.png');
    }
	create()
    {
		this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'chinchilla_games_logo').anchor.set(0.5);
	}
}

export default SplashState;
