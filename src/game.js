/* 
 * GAME settings
 */

Game = {
  // This defines our grid's size and the size of each of its tiles
  canvas: {
    width:  400,
    height: 224
  },

  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.canvas.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.canvas.height;
  },

  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height(), document.getElementById('canvas'));
    Crafty.background('rgb(255, 255, 255)');

    // Simply start the "Loading" scene to get things going
    Crafty.scene('Loading');
  }
}
