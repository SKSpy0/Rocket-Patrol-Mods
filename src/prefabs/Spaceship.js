//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, directionValue) {
        super(scene, x, y, texture, frame);
        //add to existing scene
        scene.add.existing(this);
        //stores pointValue and pixels per frame
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        //stores direction 0 = right, 1 = left
        this.direction = directionValue;
    }

    update() {
        //checks direction then moves right or left accordingly
        if(this.direction == 0){
            //move spaceship right
            this.x += this.moveSpeed;
            //wrap around from right edge to left edge
            if(this.x >= game.config.width){
                this.x = 0 - 64;
            }
        } else {
            //move Spaceship left
            this.x -= this.moveSpeed; 
            //wrap around from left edge to right edge
            if(this.x <= 0 - this.width) {
                this.x = game.config.width;
            }
        }
    }

    //makes spaceships faster
    faster(){
        this.moveSpeed += (this.moveSpeed * 0.5);
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}