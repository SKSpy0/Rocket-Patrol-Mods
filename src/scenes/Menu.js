class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    init(data){
        var dataG = data;
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/menuselect.wav');
        this.load.audio('sfx_explosion1', './assets/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_rocket', './assets/rocketshot.wav');
    }

    create() {
        if(dataG != null)
        //high score
        var highScore = {
            easy: 0,
            hard: 0,
        }
        //menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyLEFT.on('down', () =>{
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 10000,
                difficulty: 0
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene', highScore); 
        });

        keyRIGHT.on('down', () => {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                difficulty: 1  
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene', highScore); 
        });
    }
}