let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, PostMenu ]
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
//(5) Implemented FIRE UI text but only when player hasn't fired, like how old arcade games would let the player know when they can do an action again
//(5) Track high score between scenes and displays when game is finished
//(5) New scrolling tile sprite for background (gotten from https://www.reddit.com/r/PixelArt/comments/f1wg26/space_background/), it looked really pretty
//(5) Randomized direction for each spaceship
//(10) Implemented 4 explosion SFX that are randomized
//(20) New artwork for in-game assets (all created by me through Aseprite)