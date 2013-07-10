/* 
 * SCENE
 */

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() });

  // Load our sprite map image
  Crafty.load(['assets/Ken.png', 
      'assets/Ryu.png',
      'assets/bg.gif'], function(){
      
        // Inizializzazione sprite
        
        Crafty.sprite(1, 'assets/Ken.png', {
          ken_punch:  [0, 1, 90, 120]
        });
        
        Crafty.sprite(1, 'assets/Ryu.png', {
          ryu_punch:  [0, 1, 80, 100]
        }); 
        
        Crafty.scene('Game');
      });
});


Crafty.scene('Game', function(){
    Crafty.background('url(assets/bg.gif)');
    //Crafty.viewport.scroll('_x', 500);
    
    //var ken = Crafty.e('KenCharacter').at(5, 5);
    var ryu = Crafty.e('RyuCharacter').attr({
        x: 250,
        y: 110
    });
    var ken = Crafty.e('KenCharacter').attr({
        x: 50,
        y: 110
    });
});