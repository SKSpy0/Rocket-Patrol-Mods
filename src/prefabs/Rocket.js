//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        scene.add.existing(this);

        //track rocket's firing status
        this.isFiring = false;
        this.moveSpeed = 2;
        this.missed = false;

        //add rocket's audio
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    create() {
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
            }

        fireText = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "FIRE", fireConfig);
    }

    update() {
        //left/right movement
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
        
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            //play sfx
            this.sfxRocket.play();
        }

        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
           this.isFiring = false;
           this.missed = true;
           this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    //return if ship is firing (true = firing, false = not firing)
    checkFiring(){
        return this.isFiring;
    }
    
    //reset rocket to bottom
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}