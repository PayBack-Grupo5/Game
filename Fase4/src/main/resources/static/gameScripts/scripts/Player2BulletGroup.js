class Player2BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Player2Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'disp',
            setXY: { x: -100, y: -100 }
        })

        //Cooldown
        this.canShoot = true;
        this.shootCooldown = 750; // Tiempo de enfriamiento en milisegundos
    }

    preload(){
        //Sonido disparo
        this.load.audio('myGunSound', 'assets/sounds/bang.mp3');
    }

    fireBulletP2(x, y, direccion) {
        if (this.canShoot) {
            const bala = this.getFirstDead(false);
            if (bala) {
                bala.fireP2(x, y, direccion);
                // Después de disparar, iniciar el cooldown
                this.canShoot = false;
                this.scene.sound.play('myGunSound');
                this.scene.time.addEvent({
                    delay: this.shootCooldown,
                    callback: () => {
                        this.canShoot = true;
                    },
                    callbackScope: this
                });
            }
        }
    }


}