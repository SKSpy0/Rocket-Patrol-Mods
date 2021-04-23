let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//keyboard controls
let keyF, keyR, keyLEFT, keyRIGHT;

//List of Mods
//(5) Player can move after Rocket is fired
//(5) Speed Increase after 30 seconds