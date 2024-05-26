class Player2Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'disp');
    }

    fireP2(x, y, direction) {

        if (direction == 'left') {
            this.flipX = true;
            this.body.reset(x - 20, y);
            this.setVelocityX(-300);
            this.anims.play('disp', true);
            this.setOrigin(0, 0.5);

        }
        if (direction == 'right') {
            this.flipX = false;
            this.body.reset(x - 20, y);
            this.setVelocityX(300);
            this.anims.play('disp', true);
            this.setOrigin(0, 0.5);

        }

        this.setActive(true);
        this.setVisible(true);
        this.setDisplaySize(75, 16);
        //this.setSize(20, 10); // Ajustar el tamaño de la hitbox
        //this.setOffset(10, 3); // Ajustar la posición de la hitbox dentro del sprite

        this.body.setAllowGravity(false);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.x >= 800 | this.x <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
        if (this.body.velocity.x != 300 & this.body.velocity.x != -300) {
            this.x = -100;
            this.y = -100;
            this.setActive(false);
            this.setVisible(false);

        }
    }


}
