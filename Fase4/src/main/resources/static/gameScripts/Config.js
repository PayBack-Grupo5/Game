var config = {
    type: Phaser.AUTO,
    parent: 'videogame',
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    dom: {
        createContainer: true
    },
    scene: [MainMenuScene, EscenaJuego, PauseMenuScene, CreditScene, ContrlScene, TutorialScene, VictoryScenePlayer1, VictoryScenePlayer2, EscenaChat, EscenaLobby],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
