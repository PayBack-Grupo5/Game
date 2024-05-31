
class VictoryScenePlayer1 extends Phaser.Scene {

    constructor() {
        super('EscenaFinalP1');
        //Elementos de la escena final
        this.background;
        this.restartButtonContainer;
        this.victoryTextPlayer1;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'EscenaFinalP1' });
    }

    preload() {
        //Cargamos las imágenes
        this.load.image('fondoFinal', 'assets/images/imagenFinal.png');
        this.load.image('botonReiniciar', 'assets/images/reiniciar.png');
        this.load.image('TextoW', 'assets/images/vicP1.png');

    }

    create() {
        //Colocamos la imagen de victoria
        this.victoryTextPlayer1 = this.add.image(400, 200, 'TextoW');
        this.victoryTextPlayer1.setScale(0.3);
        //Colocamos la imagen de fondo
        this.background = this.add.image(400, 300, 'fondoFinal');
        this.background.setDepth(-1);
        //Colocamos el botón
        var botonReiniciar = this.add.image(0, 0, 'botonReiniciar');
        //Lo hacemos interactivo
        this.restartButtonContainer = this.add.container(400, 400, [botonReiniciar]);
        this.restartButtonContainer.setSize(botonReiniciar.height, botonReiniciar.width);
        this.restartButtonContainer.setInteractive();

        this.restartButtonContainer.on('pointerdown', function () {
            this.scene.scene.bringToTop('MainMenuScene');
            this.scene.scene.start('MainMenuScene');
        })
        //Highlight
        this.restartButtonContainer.on('pointerover', function () {
            botonReiniciar.setScale(1.3);
        })

        this.restartButtonContainer.on('pointerout', function () {
            botonReiniciar.setScale(1);
        })

        lobbySocket.close();
        posSocket.close();
        shootSocket.close();


    }
}
