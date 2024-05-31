
class CreditScene extends Phaser.Scene {
    constructor() {
        super('CreditScene');
        //Elementos de la escena final
        this.background;
        this.returnButtonContainer;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'CreditScene' });
    }

    preload() {
        //Cargamos las imágenes
        this.load.image('fondoCreditos', 'assets/images/backgroundCredits.jpeg');
        this.load.image('botonReiniciar', 'assets/images/reiniciar.png');
    }

    create() {
        //Colocamos la imagen de fondo
        this.background = this.add.image(400, 300, 'fondoCreditos');
        this.background.setDepth(-1);
        //Colocamos el botón
        var botonVolver = this.add.image(0, 0, 'botonReiniciar');
        //Lo hacemos interactivo
        this.returnButtonContainer = this.add.container(700, 550, [botonVolver]);
        this.returnButtonContainer.setSize(botonVolver.height, botonVolver.width);
        this.returnButtonContainer.setInteractive();

        this.returnButtonContainer.on('pointerdown', function () {
            this.scene.scene.bringToTop('MainMenuScene');
            this.scene.scene.start('MainMenuScene');
        })
        //Highlight
        this.returnButtonContainer.on('pointerover', function () {
            botonVolver.setScale(1.2);
        })

        this.returnButtonContainer.on('pointerout', function () {
            botonVolver.setScale(1);
        })
    }

}