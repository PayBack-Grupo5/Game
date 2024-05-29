class TutorialScene extends Phaser.Scene {
    constructor() {
        super("TutorialScene");
        // Elementos de la escena de tutorial
        this.background;
        this.backButtonContainer;
    }

    initialize() {
        Phaser.Scene.call(this, { key: 'TutorialScene' });
    }

    preload() {
        // Cargar imágenes de fondo y botón
        this.load.image('tutorialBackground', 'assets/images/nocheEstrellas.jpg');
        this.load.image('backButton', 'assets/images/reiniciar.png');
    }

    create() {
        // Añadir la imagen de fondo
        this.background = this.add.image(400, 300, 'tutorialBackground').setDepth(-1).setScale(2.4);

        // Estilo de texto
        const textStyle = { fontSize: '24px', fill: '#FFA500', fontWeight: 'bold' };

        // Añadir texto de instrucciones
        this.add.text(400, 150, 'Cómo jugar:', { fontSize: '32px', fill: '#FFA500', fontWeight: 'bold' }).setOrigin(0.5);
        this.add.text(400, 250, '1. Evita que acaben con tus vidas', textStyle).setOrigin(0.5);
        this.add.text(400, 300, '2. Acaba con las vidas del rival', textStyle).setOrigin(0.5);
        this.add.text(400, 350, '3. Repito, no mueras, con eso vale :)', textStyle).setOrigin(0.5);

        // Añadir el botón de regresar
        const backButton = this.add.image(0, 0, 'backButton');

        // Hacer que el botón sea interactivo
        this.backButtonContainer = this.add.container(400, 500, [backButton]);
        this.backButtonContainer.setSize(backButton.width, backButton.height);
        this.backButtonContainer.setInteractive();

        // Si pulsamos, nos lleva de vuelta al menú principal
        this.backButtonContainer.on('pointerdown', function () {
            this.scene.start('MainMenuScene');
        }, this);

        // Resalta el botón al pasar el puntero sobre él
        this.backButtonContainer.on('pointerover', function () {
            backButton.setScale(1.5);
        });

        // Restaura la escala normal del botón al quitar el puntero
        this.backButtonContainer.on('pointerout', function () {
            backButton.setScale(1);
        });
    }
}