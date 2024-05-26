class Player1Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'disp');
    }

    fireP1(x, y, direction) {

        if (direction == 'left') {
            this.flipX = true;
            this.body.reset(x - 20, y);
            this.setVelocityX(-300);
            this.anims.play('disp', true);
            this.setOrigin(0, 0.5);

        } else if (direction == 'right') {
            this.flipX = false;
            this.body.reset(x - 20, y);
            this.setVelocityX(300);
            this.setDepth(-1);
            this.anims.play('disp', true);
            this.setOrigin(0, 0.5);
        }
        this.setActive(true);
        this.setVisible(true);
        this.setDisplaySize(75, 16);
        //this.setSize(24, 20); // Ajustar el tamaño de la hitbox
        //this.setOffset(8, 12); // Ajustar la posición de la hitbox dentro del sprite
        this.body.setAllowGravity(false);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        //const screenWidth = this.scene.scale.width;

        if (this.x >= 800 || this.x <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.body.velocity.x != 300 & this.body.velocity.x != -300) {
            this.x = 0;
            this.y = 0;
            this.setActive(false);
            this.setVisible(false);

        }
    }

}
