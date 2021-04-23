class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init(data){
        this.highScore = data;
        console.log(this.highScore);
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 4})
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //define keyboard controls
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add rocket(p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket');

        //randomize direction for spaceships, 0 = right, 1 = left
        let ranDir1 = Math.floor(Math.random() * 2);
        let ranDir2 = Math.floor(Math.random() * 2);
        let ranDir3 = Math.floor(Math.random() * 2);

        //add spaceships(x3) according to the random direction given
        if(ranDir1 == 0){
            this.ship01 = new Spaceship(this, 0 - (borderUISize*6 + 64), borderUISize*4, 'spaceship', 0, 30, 0).setOrigin(0,0);
        } else {
            this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, 1).setOrigin(0, 0);
        }
        if(ranDir2 == 0){
            this.ship02 = new Spaceship(this, 0 - (borderUISize*3 + 64), borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 0).setOrigin(0,0);
        } else {
            this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 1).setOrigin(0, 0);
        }
        if(ranDir3 == 0){
            this.ship03 = new Spaceship(this, 0 - 64, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 0).setOrigin(0,0);
        } else {
            this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 1).setOrigin(0, 0);
        }

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 4, first: 0}),
            frameRate: 15
        });

        //initialize score
        this.p1Score = 0;

        //initialize time
        this.timeLeft = game.settings.gameTimer * 0.001;

        // display score
        let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        //display FIRE text
        scoreConfig.align = 'center';
        this.firingText = this.add.text((game.config.width/2) - 64, borderUISize + borderPadding*2, "FIRE!", scoreConfig);

        //display time remaining
        scoreConfig.align = 'left';
        this.timeText = this.add.text(game.config.width - 144, borderUISize + borderPadding*2, this.timeLeft, scoreConfig);

        //GAME OVER flag
        this.gameOver = false;

        //end screen flag
        this.endScreen = false;

        scoreConfig.align = 'right';
        scoreConfig.fixedWidth = 0;

        //30-second spaceship speed increase
        this.clock = this.time.delayedCall(30000, () => {
            this.ship01.faster();
            this.ship02.faster();
            this.ship03.faster();
        }, null, this);
    }

    update() {
        //when game is over run this once
        if(this.gameOver && !this.endScreen){

            //hide score, FIRE, rocket, and spaceships
            this.scoreLeft.alpha = 0;
            this.p1Rocket.alpha = 0;
            this.ship01.alpha = 0;
            this.ship02.alpha = 0;
            this.ship03.alpha = 0;

            //shows GAME OVER and options text
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'YOUR SCORE', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, this.p1Score, this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 96, 'Press (R) to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);

            if(game.settings.difficulty == 0){
                //updates highscore if necessary
                if(this.p1Score > this.highScore.easy){
                    this.highScore.easy = this.p1Score;
                }
                //displays current highscore in current session
                this.add.text(game.config.width/2, game.config.height/2 - 32, 'HIGH SCORE', this.scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2, this.highScore.easy, this.scoreConfig).setOrigin(0.5);
            } else {
                //updates highscore if necessary
                if(this.p1Score > this.highScore.hard){
                    this.highScore.hard = this.p1Score;
                }
                //displays current highscore in current session
                this.add.text(game.config.width/2, game.config.height/2 - 32, 'HIGH SCORE', this.scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2, this.highScore.hard, this.scoreConfig).setOrigin(0.5);
            }

            console.log(this.highScore.easy);
            console.log(this.highScore.hard);

            this.endScreen = true;
        }

        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.highScore);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("postMenu", this.highScore);
        }
        //scrolling star tile sprite
        this.starfield.tilePositionX -= 2;

        //FIRE text on UI when ship is not firing
        if(this.p1Rocket.checkFiring() || this.gameOver){
            this.firingText.alpha = 0;
        } else {
            this.firingText.alpha = 1;
        }

        //game will keep rockets and ship updated until game goes past 60 seconds
        if(!this.gameOver){
            //initializes update rocket code
            this.p1Rocket.update();
            //initializes update spaceship code
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            //updates clock
            var timeLeft = (game.settings.gameTimer * 0.001) - (this.time.now * 0.001);
            this.timeText.setText(Math.round(timeLeft));
        }

        //will end game once timer reaches 0
        if(timeLeft <= 0){ 
            console.log("time over");
            this.gameOver = true;
        }

        //checks collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            game.settings.gameTimer += 1000;
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            game.settings.gameTimer += 2000;
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            game.settings.gameTimer += 5000;
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        //create explotion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        //play explode anim
        boom.anims.play('explode');
        //callback after anim completes
        boom.on('animationcomplete', () => {
            //reset ship position
            ship.reset();
            //unhide ship
            ship.alpha = 1;
            //remove explosion sprite
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //play random explosion sound
        let randomExpSound = Math.floor(Math.random() * 4);
        switch(randomExpSound){
            case 0:
                this.sound.play('sfx_explosion1');
                break;
            case 1:
                this.sound.play('sfx_explosion2');
                break;
            case 2:
                this.sound.play('sfx_explosion3');
                break;
            case 3:
                this.sound.play('sfx_explosion4');
                break;
        }

    }
}