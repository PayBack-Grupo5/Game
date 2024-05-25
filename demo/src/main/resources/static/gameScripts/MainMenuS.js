class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
        // Elementos de la escena de menú inicial
        this.background;
        this.playButtonContainer;
        this.creditsButtonContainer;
        this.contrlButtonContainer;
        this.tutorialButtonContainer;
    }

    preload() {
        // Imágenes de fondo y botón
        this.load.image('titleBackground', 'assets/images/titulo.jpeg');
        this.load.image('playButton', 'assets/images/botonJugar.png');
        this.load.image('creditsButton', 'assets/images/botonCredits.png');
        this.load.image('contrlButton', 'assets/images/botonContrl.png');
        this.load.image('tutorialButton', 'assets/images/botonTutorial.png');
    }

    create() {
        // Añadimos la imagen de fondo
        this.background = this.add.image(400, 300, 'titleBackground').setDepth(-1);

        // Añadimos el botón de juego
        const playButton = this.add.image(0, 0, 'playButton');
        const creditsButton = this.add.image(0, 0, 'creditsButton');
        const contrlButton = this.add.image(0, 0, 'contrlButton');
        const tutorialButton = this.add.image(0, 0, 'tutorialButton');

        // Hacemos que el botón sea interactivo
        this.playButtonContainer = this.add.container(400, 450, [playButton]);
        this.playButtonContainer.setSize(playButton.width, playButton.height);
        this.playButtonContainer.setInteractive();
        // Hacemos que el botón sea interactivo
        this.creditsButtonContainer = this.add.container(400, 550, [creditsButton]);
        this.creditsButtonContainer.setSize(creditsButton.width, creditsButton.height);
        this.creditsButtonContainer.setInteractive();
        // Hacemos que el botón sea interactivo
        this.contrlButtonContainer = this.add.container(700, 100, [contrlButton]);
        this.contrlButtonContainer.setSize(contrlButton.width, contrlButton.height);
        this.contrlButtonContainer.setInteractive();
        // Hacemos que el botón sea interactivo
        this.tutorialButtonContainer = this.add.container(100, 100, [tutorialButton]);
        this.tutorialButtonContainer.setSize(tutorialButton.width, tutorialButton.height);
        this.tutorialButtonContainer.setInteractive();

        // Si pulsamos, nos lleva a la escena de juego
        this.playButtonContainer.on('pointerdown', function () {
            this.scene.scene.bringToTop('GameScene');
            this.scene.scene.launch('PauseMenuScene');
            this.scene.scene.launch('GameScene');
            this.scene.scene.sleep('PauseMenuScene');
        });

        // Resalta el botón al pasar el puntero sobre él
        this.playButtonContainer.on('pointerover', function () {
            playButton.setScale(1.5);
        });

        // Restaura la escala normal del botón al quitar el puntero
        this.playButtonContainer.on('pointerout', function () {
            playButton.setScale(1);
        });

        // Si pulsamos, nos lleva a la escena de créditos
        this.creditsButtonContainer.on('pointerdown', function () {
            this.scene.scene.bringToTop('CreditScene');
            this.scene.scene.launch('CreditScene');
        });

        // Resalta el botón al pasar el puntero sobre él
        this.creditsButtonContainer.on('pointerover', function () {
            creditsButton.setScale(1.5);
        });

        // Restaura la escala normal del botón al quitar el puntero
        this.creditsButtonContainer.on('pointerout', function () {
            creditsButton.setScale(1);
        });

        // Si pulsamos, nos lleva a la escena de controles
        this.contrlButtonContainer.on('pointerdown', function () {
            this.scene.scene.bringToTop('ContrlScene');
            this.scene.scene.launch('ContrlScene');
        });

        // Resalta el botón al pasar el puntero sobre él
        this.contrlButtonContainer.on('pointerover', function () {
            contrlButton.setScale(1.5);
        });

        // Restaura la escala normal del botón al quitar el puntero
        this.contrlButtonContainer.on('pointerout', function () {
            contrlButton.setScale(1);
        });

        // Si pulsamos, nos lleva a la escena de tutorial
        this.tutorialButtonContainer.on('pointerdown', function () {
            this.scene.scene.bringToTop('TutorialScene');
            this.scene.scene.launch('TutorialScene');
        });

        // Resalta el botón al pasar el puntero sobre él
        this.tutorialButtonContainer.on('pointerover', function () {
            tutorialButton.setScale(1.5);
        });

        // Restaura la escala normal del botón al quitar el puntero
        this.tutorialButtonContainer.on('pointerout', function () {
            tutorialButton.setScale(1);
        });
    }
}