var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 650 },
            debug: false
        }
    },
    autoCenter: false,

    scene: [MainMenuScene, EscenaJuego, PauseMenuScene, VictoryScenePlayer1, VictoryScenePlayer2, CreditScene, ContrlScene, TutorialScene, Lobby],

    dom: {
        createContainer: true
    }
};

var game = new Phaser.Game(config);

