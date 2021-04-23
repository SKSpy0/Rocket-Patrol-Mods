class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/menuselect.wav');
        this.load.audio('sfx_explosion1', './assets/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_rocket', './assets/rocketshot.wav');
        this.load.image('menu_screen', './assets/menuscreen.png');
    }

    create() {

        //high score
        let highScore = {
            easy: 0,
            hard: 0
        }

        //menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#FFFFFF00',
            color: '#00FFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu screen
        this.menuScreen = this.add.sprite(0, 0, 'menu_screen').setOrigin(0,0);
        this.add.text(game.config.width/2, game.config.height - borderUISize - borderPadding*2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - borderUISize, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyLEFT.on('down', () =>{
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
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