
class VictoryScenePlayer2 extends Phaser.Scene {

    constructor() {
        super('EscenaFinalP2');
        //Elementos de la escena final
        this.background;
        this.restartButtonContainer;
        this.victoryTextPlayer2;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'EscenaFinalP2' });
    }

    preload() {
        //Cargamos las imágenes
        this.load.image('fondoFinal', 'assets/images/imagenFinal.png');
        this.load.image('botonReiniciar', 'assets/images/reiniciar.png');
        this.load.image('TextoW', 'assets/images/vicP2.png');
    }

    create() {
        //Colocamos la imagen de victoria
        this.victoryTextPlayer2 = this.add.image(400, 200, 'TextoW');
        this.victoryTextPlayer2.setScale(0.3);
        //Colocamos la imagen de fondo
        this.background = this.add.image(400, 300, 'fondoFinal');
        this.background.setDepth(-1);
        //Colocamos el botón
        var botonReiniciarJ2 = this.add.image(0, 0, 'botonReiniciar');
        //Lo hacemos interactivo
        this.restartButtonContainer = this.add.container(400, 400, [botonReiniciarJ2]);
        this.restartButtonContainer.setSize(botonReiniciarJ2.height, botonReiniciarJ2.width);
        this.restartButtonContainer.setInteractive();

        this.restartButtonContainer.on('pointerdown', function () {
            this.scene.scene.bringToTop('MainMenuScene');
            this.scene.scene.start('MainMenuScene');
        })
        //Highlight
        this.restartButtonContainer.on('pointerover', function () {
            botonReiniciarJ2.setScale(1.3);
        })

        this.restartButtonContainer.on('pointerout', function () {
            botonReiniciarJ2.setScale(1);
        })

        lobbySocket.close();
        posSocket.close();
        shootSocket.close();
    }
}

