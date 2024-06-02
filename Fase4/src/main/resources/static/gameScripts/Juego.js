var gameScenePointer;

var player1;
var player2;

var xP1;
var yP1;

var xP2;
var yP2;

var lastP2direction;
var lastP1direction;

var p1_isIdle = true;
var p2_isIdle = true;

var saltandoP1 = false;
var saltandoP2 = false;

var p1_isShooting = false;
var p2_isShooting = false;

var heartX;
var heartY;

class EscenaJuego extends Phaser.Scene {

    constructor() {
        super('GameScene');

        //Elementos de la escena
        this.sky;
        this.platforms;

        //Players
       // this.player1;
       // this.player2;

        //Pad
        this.cursors;

        //Vidas
        this.vidasply1;
        this.vidasply2;

        //Sprite de las vidas
        this.imgvidasply2;
        this.imgvidasply1;

        //Impactos
        this.impactoP1 = false;
        this.impactoP2 = false;

        //Ultimas direcciones de los players
       // this.lastP1direction;
       // this.lastP2direction;

        //GameOver
        this.gameOver = false;

        //Botón de pausa
        this.pauseButtonContainer;

        //Vida extra
        this.lifeItem;

    }

    initialize() {
        Phaser.Scene.call(this, { key: 'GameScene' });
        // Reiniciar las vidas según sea necesario
        this.vidasply1 = 3;
        this.vidasply2 = 3;
    }

    preload() {
        //Imagenes escenario
        this.load.image('suelo', 'assets/images/platform.png');
        this.load.image('muro', 'assets/images/muro.png');
        this.load.image('fondo', 'assets/images/background.jpeg');

        //Hojas de sprites de los personajes y disparo                
        this.load.spritesheet('personaje1',
            'assets/images/sprite personaje1.png',
            { frameWidth: 568, frameHeight: 633 }
        );

        this.load.spritesheet('personaje2',
            'assets/images/sprite personaje2.png',
            { frameWidth: 568, frameHeight: 633 }
        );

        this.load.spritesheet('disparo',
            'assets/images/disparo2.png',
            { frameWidth: 254, frameHeight: 120 }
        );
        //this.load.image('disparo', 'assets/images/disparo.jpeg');

        //Imagenes de las vidas
        this.load.image('vidas player1 4', 'assets/images/vidas roja 4.png');
        this.load.image('vidas player1 3', 'assets/images/vidas roja 3.png');
        this.load.image('vidas player1 2', 'assets/images/vidas roja 2.png');
        this.load.image('vidas player1 1', 'assets/images/vidas roja 1.png');
        this.load.image('vidas player2 4', 'assets/images/vidas azul 4.png');
        this.load.image('vidas player2 3', 'assets/images/vidas azul 3.png');
        this.load.image('vidas player2 2', 'assets/images/vidas azul 2.png');
        this.load.image('vidas player2 1', 'assets/images/vidas azul 1.png');
        this.load.image('vidas', 'assets/images/vidas.png');

        //Boton de pausa
        this.load.image('Pausa', 'assets/images/pausa.png')

        //Sonido disparo
        this.load.audio('myGunSound', 'assets/sounds/bang.mp3');

        //Sonido daño 
        this.load.audio('ouch', 'assets/sounds/hit.mp3');

    }

    create() {
        console.log("Escena de juego creada!")
        gameScenePointer = this;

        //Añadimos el fondo
        this.sky = this.add.image(400, 300, 'fondo');
        this.sky.setDepth(-1);
        this.sky.setDisplaySize(800, 600);

        /*
        //Añadimos el boton de pausa
        this.pauseImage = this.add.image(0, 0, 'Pausa');
        //Lo hacemos interactivo
        this.pauseButtonContainer = this.add.container(400, 50, [this.pauseImage]);
        this.pauseButtonContainer.setSize(this.pauseImage.height, this.pauseImage.width);

        if (this.pauseButtonContainer) {
            this.pauseButtonContainer.on('pointerdown', () => {
                if (this.scene && this.scene.wake && this.scene.pause) {
                    this.scene.launch('PauseMenuScene');
                    this.scene.pause('GameScene');
                }
            });
        }

        if (this.pauseButtonContainer && this.pauseImage) {
            this.pauseButtonContainer.on('pointerover', () => {
                this.pauseImage.setScale(1.2);
            });

            this.pauseButtonContainer.on('pointerout', () => {
                this.pauseImage.setScale(1);
            });
        }*/


        //Añadimos las plataformas
        //Las hacemos estáticas
        this.platforms = this.physics.add.staticGroup();

        //Colocamos el suelo
        this.platforms.create(400, 600, 'suelo').setScale(2).refreshBody();

        //Colocamos las plataformas
        this.platforms.create(195, 240, 'suelo').setDisplaySize(255, 32).refreshBody();
        this.platforms.create(140, 470, 'suelo').setDisplaySize(95, 32).refreshBody();
        this.platforms.create(530, 300, 'suelo').setDisplaySize(125, 25).refreshBody();
        this.platforms.create(750, 400, 'suelo').setDisplaySize(110, 25).refreshBody();
        this.platforms.create(400, 430, 'suelo').setDisplaySize(125, 20).refreshBody();
        this.platforms.create(450, 200, 'suelo').setDisplaySize(100, 25).refreshBody();
        this.platforms.create(550, 450, 'suelo').setDisplaySize(150, 25).refreshBody();
        this.platforms.create(250, 350, 'suelo').setDisplaySize(105, 25).refreshBody();

        //Colocamos los muros
        this.platforms.create(250, 540, 'muro').setDisplaySize(32, 60).refreshBody();
        this.platforms.create(375, 510, 'muro').setDisplaySize(25, 140).refreshBody();
        this.platforms.create(585, 380, 'muro').setDisplaySize(32, 130).refreshBody();
        this.platforms.create(205, 190, 'muro').setDisplaySize(32, 80).refreshBody();


        //Colocamos las vidas
        this.imgvidasply1 = this.add.image(100, 40, 'vidas player1 3').setDepth(2).setDisplaySize(260, 260);
        this.imgvidasply1.flipX = false;
        this.imgvidasply2 = this.add.image(700, 40, 'vidas player2 3').setDepth(2).setDisplaySize(260, 260);
        this.imgvidasply2.flipX = true;

        //Creamos el corazon de vida extra
        this.lifeItems = this.physics.add.group();
        //this.createLifeItem();
        this.time.delayedCall(10000, this.createLifeItem, [], this);

        //Solo aparece una en toda la partida
        this.lifeItemAppeared = false;

        //Colocamos al player1
        this.player1 = this.physics.add.sprite(500, 500, 'personaje1');
        this.player1.setDisplaySize(32, 48);
        this.player1.setCollideWorldBounds(true);
        //this.lastP1direction = 'right';


        //Colocamos al player2
        this.player2 = this.physics.add.sprite(300, 500, 'personaje2');
        this.player2.setDisplaySize(32, 48);
        this.player2.setCollideWorldBounds(true);
        //this.lastP2direction = 'right';

        // Agregar gravedad a los jugadores
        this.player1.body.setGravityY(800);
        this.player2.body.setGravityY(800);

        //Animaciones del player1
        this.anims.create({
            key: 'play1right',
            frames: this.anims.generateFrameNumbers('personaje1', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'play1left',
            frames: this.anims.generateFrameNumbers('personaje1', { start: 6, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'play1front',
            frames: [{ key: 'personaje1', frame: 5 }],
            frameRate: 20
        });

        //Animaciones del player2
        this.anims.create({
            key: 'play2right',
            frames: this.anims.generateFrameNumbers('personaje2', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'play2left',
            frames: this.anims.generateFrameNumbers('personaje2', { start: 6, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'play2front',
            frames: [{ key: 'personaje2', frame: 5 }],
            frameRate: 20
        });


        //Animaciones de disparo
        this.anims.create({
            key: 'disp',
            frames: this.anims.generateFrameNumbers('disparo', { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1
        });

        //Collider entre player y plataformas
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);
        //Pad
        this.cursors = this.input.keyboard.createCursorKeys();
        //Teclas
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Disparos 
        this.disparosP1 = new Player1BulletGroup(this);
        this.disparosP2 = new Player2BulletGroup(this);
        //Collider entre player y disparos
        this.physics.add.collider(this.disparosP1, this.player2, this.hitPlayer2, null, this);
        this.physics.add.collider(this.disparosP2, this.player1, this.hitPlayer1, null, this);
        this.physics.add.collider(this.disparosP1, this.platforms);
        this.physics.add.collider(this.disparosP2, this.platforms);
        // Collider con los jugadores y las vidas


        this.vidasply1 = 3;
        this.vidasply2 = 3;

    }

    //Metodo para disparo de player1
    shootdisparoP1(xpos, ypos, direc) {
        this.disparosP1.fireBalaP1(xpos, ypos, direc);
    }
    //Metodo para disparo de player2
    shootdisparoP2(xpos, ypos, direc) {
        this.disparosP2.fireBulletP2(xpos, ypos, direc);

    }


    update() {

        if (posSocketCreated) {
            if (localPlayer == 1) {
                //Player izq Movimiento
                if (this.keyA.isDown) {
                    this.player2.setVelocityX(-160);
                    this.player2.anims.play('play2left', true);
                    this.lastP2direction = 'left';
                    posSocket.sendWS(this.player2.x, this.player2.y, this.lastP2direction, localPlayer, false);
                } else if (this.keyD.isDown) {
                    this.player2.setVelocityX(160);
                    this.player2.anims.play('play2right', true);
                    this.lastP2direction = 'right';
                    posSocket.sendWS(this.player2.x, this.player2.y, this.lastP2direction, localPlayer, false);
                } else {
                    this.player2.setVelocityX(0);
                    this.player2.anims.play('play2front');
                    posSocket.sendWS(this.player2.x, this.player2.y, this.lastP2direction, localPlayer, true);
                }
                if (this.keyW.isDown && this.player2.body.blocked.down) {
                    saltandoP1 = true;
                    this.player2.setVelocityY(-500);
                } if (this.player2.body.touching.down) {
                    saltandoP1 = false;
                }
                if (saltandoP1) {
                    posSocket.sendWS(this.player2.x, this.player2.y, this.lastP2direction, localPlayer);
                }

                //ACTUALIZAR MOVIMIENTO DEL PLAYER Drch
                this.player1.x = xP2;
                this.player1.y = yP2;

                //ACTUALIZAR DIRECCION DEL PLAYER Drch
                this.lastP1direction = lastP1direction

                //ANIMACIONES PLAYER Drch
                if (p2_isIdle) {
                    this.player1.anims.play('play1front');
                }
                else if (lastP1direction == 'left') {
                    this.player1.anims.play('play1left', true);
                }
                else if (lastP1direction == 'right') {
                    this.player1.anims.play('play1right', true);
                }

                //Disparo del player Izq
                if ((Phaser.Input.Keyboard.JustDown(this.keyF))) {
                    shootSocket.sendWS(localPlayer);
                    if (this.player2.body.touching.left & this.lastP2direction == 'left') {

                    }
                    else if (this.player2.body.touching.right & this.lastP2direction == 'right') {

                    }
                    else {
                        this.shootdisparoP2(this.player2.x, this.player2.y, this.lastP2direction);
                    }
                }

                //ACTUALIZACION DISPARO PLAYER Drch
                if (p1_isShooting) {
                    if (this.player1.body.touching.left & this.lastP1direction == 'left') {

                    }
                    else if (this.player1.body.touching.right & this.lastP1direction == 'right') {
            
                    }
                    else {
                        this.shootdisparoP1(this.player1.x, this.player1.y, this.lastP1direction);
                    }
                    p1_isShooting = false;
                }
                console.log("Player1 creado:", this.player1);
                console.log("Player2 creado:", this.player2);

            }
            else if (localPlayer == 2) {
                //Player Drch Movimiento
                if (this.keyA.isDown) {
                    this.player1.setVelocityX(-160);
                    this.player1.anims.play('play1left', true);
                    this.lastP1direction = 'left';
                    posSocket.sendWS(this.player1.x, this.player1.y, this.lastP1direction, localPlayer, false);
                } else if (this.keyD.isDown) {
                    this.player1.setVelocityX(160);
                    this.player1.anims.play('play1right', true);
                    this.lastP1direction = 'right';
                    posSocket.sendWS(this.player1.x, this.player1.y, this.lastP1direction, localPlayer, false);
                } else {
                    this.player1.setVelocityX(0);
                    this.player1.anims.play('play1front');
                    posSocket.sendWS(this.player1.x, this.player1.y, this.lastP1direction, localPlayer, true);
                }
                if (this.keyW.isDown && this.player1.body.blocked.down) {
                    saltandoP2 = true;
                    this.player1.setVelocityY(-500);
                } if (this.player1.body.touching.down) {
                    saltandoP2 = false;
                }
                if (saltandoP2) {
                    posSocket.sendWS(this.player1.x, this.player1.y, this.lastP1direction, localPlayer);

                }
                
                //ACTUALIZACION POSICIONES
                this.player2.x = xP1;
                this.player2.y = yP1;

                //ANIMACIONES
                this.lastP2direction = lastP2direction

                
                if (p1_isIdle) {
                    this.player2.anims.play('play2front');
                }
                else if (lastP2direction == 'left') {
                    this.player2.anims.play('play2left', true);
                }
                else if (lastP2direction == 'right') {
                    this.player2.anims.play('play2right', true);
                }

                //Disparo del player Drch
                if ((Phaser.Input.Keyboard.JustDown(this.keyF))) {
                    shootSocket.sendWS(localPlayer);
                    if (this.player1.body.touching.left & this.lastP1direction == 'left') {

                    }
                    else if (this.player1.body.touching.right & this.lastP1direction == 'right') {

                    }
                    else {
                        this.shootdisparoP1(this.player1.x, this.player1.y, this.lastP1direction);

                    }
                }
                if (p2_isShooting) {
                    if (this.player2.body.touching.left & this.lastP2direction == 'left') {

                    }
                    else if (this.player2.body.touching.right & this.lastP2direction == 'right') {

                    }
                    else {
                        this.shootdisparoP2(this.player2.x, this.player2.y, this.lastP2direction);
                        

                    }
                    p2_isShooting = false;

                }
                console.log("Player1 creado:", this.player1);
                console.log("Player2 creado:", this.player2);

            }
        }

        //Si el player 1 sufre un impacto se tiñe de rojo durante 0.3 secs
        if (this.impactoP2 == true) {
            this.player2.setTint(0xff0000);
            //Sonido                
            this.sound.play('ouch');
            setTimeout(() => {
                this.player2.setTint(0xffffff);
            }, "300")
            this.impactoP2 = false;
        }

        //Si el player 2 sufre un impacto se tiñe de rojo durante 0.3 secs
        if (this.impactoP1 == true) {
            this.player1.setTint(0xff0000);
            //Sonido
            this.sound.play('ouch');
            setTimeout(() => {
                this.player1.setTint(0xffffff);
            }, "300");
            this.impactoP1 = false;
        }

        //Si el player 2 se queda sin vidas
        else if (this.gameOver == true && this.vidasply2 == 0) {
            this.vidasply1 = 3;
            this.vidasply2 = 3;
            this.gameOver = false;
            this.shutdown();
            this.scene.start('EscenaFinalP1');
            this.scene.bringToTop('EscenaFinalP1');
            lobbySocket.sendWS("winJ1")
        }

        //Si el player 1 se queda sin vidas
        if (this.gameOver == true && this.vidasply1 == 0) {
            this.vidasply1 = 3;
            this.vidasply2 = 3;
            this.gameOver = false;
            this.shutdown();
            this.scene.start('EscenaFinalP2');
            this.scene.bringToTop('EscenaFinalP2');
            lobbySocket.sendWS("winJ2")
        }

        // Pausa el juego
        if (Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
            this.scene.launch('PauseMenuScene');
            this.scene.pause('GameScene');
        }
    }
    
    /*
    createLifeItem() {
        if (!this.lifeItemAppeared) {
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(100, 500);
            this.lifeItem = this.lifeItems.create(x, y, 'vidas');
            this.lifeItem.setDisplaySize(50, 50);

            // Collider con el suelo
            this.physics.add.collider(this.lifeItem, this.platforms);

            this.physics.add.overlap(this.lifeItem, this.player1, this.hitLifeItem1, null, this);
            this.physics.add.overlap(this.lifeItem, this.player2, this.hitLifeItem2, null, this);
            heartSocketSocket.sendWS(x,y);

        }else{
            this.lifeItem.create(heartX,heartY);
        }
    }*/

    hitLifeItem1(lifeItem, player) {
        lifeItem.destroy(); // Elimina el corazón del juego
        player.extraLife = true; // Establece la vida extra al jugador
        this.updateLifeImages1(player);
    }

    hitLifeItem2(lifeItem, player) {
        lifeItem.destroy(); // Elimina el corazón del juego
        player.extraLife = true; // Establece la vida extra al jugador
        this.updateLifeImages2(player);
    }

    updateLifeImages1(player) {
        if (this.vidasply2 == 3) {
            this.vidasply2++;
            const vidaImageKey = player.extraLife ? 'vidas player2 4' : 'vidas player2 3'; // Usar el sprite de corazón si tiene vida extra
            const vidaImage = this.add.image(700, 40, vidaImageKey).setDepth(2).setDisplaySize(260, 260);
            vidaImage.flipX = true;
        } else if (this.vidasply2 == 2) {
            this.vidasply2++;
            const vidaImageKey = player.extraLife ? 'vidas player2 3' : 'vidas player2 2'; // Usar el sprite de corazón si tiene vida extra
            const vidaImage = this.add.image(700, 40, vidaImageKey).setDepth(2).setDisplaySize(260, 260);
            vidaImage.flipX = true;
        } else if (this.vidasply2 == 1) {
            this.vidasply2++;
            const vidaImageKey = player.extraLife ? 'vidas player2 2' : 'vidas player2 1'; // Usar el sprite de corazón si tiene vida extra
            const vidaImage = this.add.image(700, 40, vidaImageKey).setDepth(2).setDisplaySize(260, 260);
            vidaImage.flipX = true;
        }
    }

    updateLifeImages2(player) {
        if (this.vidasply1 == 3) {
            this.vidasply1++;
            const vidaImageKey = player.extraLife ? 'vidas player1 4' : 'vidas player1 3'; // Usar el sprite de corazón si tiene vida extra
            const vidaImage = this.add.image(100, 40, vidaImageKey).setDepth(2).setDisplaySize(260, 260);
            vidaImage.flipX = false;
        } else if (this.vidasply1 == 2) {
            this.vidasply1++;
            const vidaImageKey = player.extraLife ? 'vidas player1 3' : 'vidas player1 2'; // Usar el sprite de corazón si tiene vida extra
            const vidaImage = this.add.image(100, 40, vidaImageKey).setDepth(2).setDisplaySize(260, 260);
            vidaImage.flipX = false;
        } else if (this.vidasply1 == 1) {
            this.vidasply1++;
            const vidaImageKey = player.extraLife ? 'vidas player1 2' : 'vidas player1 1'; // Usar el sprite de corazón si tiene vida extra
            const vidaImage = this.add.image(100, 40, vidaImageKey).setDepth(2).setDisplaySize(260, 260);
            vidaImage.flipX = false;
        }
    }

    //Cuando del player 1 es impactado se resta una vida y se sobre pone el sprite de la vida que tiene
    hitPlayer1(disparosP2, player) {
        if (this.vidasply2 > 0) {
            this.vidasply2 = this.vidasply2 - 1;
            this.impactoP1 = true;
            if (this.vidasply2 == 3) {
                this.imgvidasply2 = this.add.image(700, 40, 'vidas player2 3').setDepth(2).setDisplaySize(260, 260);
                this.imgvidasply2.flipX = true;
            }
            if (this.vidasply2 == 2) {
                this.imgvidasply2 = this.add.image(700, 40, 'vidas player2 2').setDepth(2).setDisplaySize(260, 260);
                this.imgvidasply2.flipX = true;

            }
            if (this.vidasply2 == 1) {
                this.imgvidasply2 = this.add.image(700, 40, 'vidas player2 1').setDepth(2).setDisplaySize(260, 260);
                this.imgvidasply2.flipX = true;

            }
        }
        //Cuando se queda sin vidas gameOver es true
        if (this.vidasply2 < 1) {
            this.physics.pause();
            this.player1.setTint(0xff0000);
            this.gameOver = true;
        }
    }
    //Cuando del player 2 es impactado se resta una vida y se sobre pone el sprite de la vida que tiene
    hitPlayer2(disparosP1, player) {
        if (this.vidasply1 > 0) {
            this.vidasply1 = this.vidasply1 - 1;
            this.impactoP2 = true;
            if (this.vidasply1 == 3) {
                this.imgvidasply1 = this.add.image(100, 40, 'vidas player1 3').setDepth(2).setDisplaySize(260, 260);
                this.imgvidasply1.flipX = false;

            }
            if (this.vidasply1 == 2) {
                this.imgvidasply1 = this.add.image(100, 40, 'vidas player1 2').setDepth(2).setDisplaySize(260, 260);
                this.imgvidasply1.flipX = false;

            }
            if (this.vidasply1 == 1) {
                this.imgvidasply1 = this.add.image(100, 40, 'vidas player1 1').setDepth(2).setDisplaySize(260, 260);
                this.imgvidasply1.flipX = false;

            }
        }
        //Cuando se queda sin vidas gameOver es true
        if (this.vidasply1 < 1) {
            this.physics.pause();
            this.player2.setTint(0xff0000);
            this.gameOver = true;
        }
    }

    // Método llamado cuando la escena es destruida o cambiada
    shutdown() {
        /*this.keyP.removeKey;
        this.keyA.removeKey;
        this.keyS.removeKey;
        this.keyD.removeKey;
        this.keyW.removeKey;
        this.keyF.removeKey;
        this.keyEsc.removeKey;*/
        this.keyP = this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyA = this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyF = this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyEsc = this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //super.destroy();        
    }
}

