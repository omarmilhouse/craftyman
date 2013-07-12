/*
* SCENE
*/

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function() {
	// Draw some text for the player to see in case the file
	//  takes a noticeable amount of time to load
	Crafty.e('2D, DOM, Text').text('Loading...').attr({
		x : 0,
		y : Game.height() / 2 - 24,
		w : Game.width()
	});

	// Load our sprite map image
	Crafty.load(['assets/ken_sprite.gif', 'assets/ryu_sprite.gif', 'assets/bg.gif'], function() {

		// Inizializzazione sprite

		Crafty.sprite(50, 105, 'assets/ken_sprite.gif', {
			ken_punch : [0, 0]
		});

		Crafty.sprite(50, 105, 'assets/ryu_sprite.gif', {
			ryu_idle : [0, 0],
			ryu_jump : [9, 0]
		});
		
		Crafty.sprite(49, 105, 'assets/ryu_sprite.gif', {
			ryu_walking : [4, 0]
		});

		Crafty.scene('Game');
	});
});

Crafty.scene('Game', function() {
	Crafty.background('url(assets/bg.gif)');
	//Crafty.viewport.scroll('_x', 500);

	Crafty.e("Platform, 2D, DOM").attr({
		x : 0,
		y : 220,
		w : 400,
		h : 10
	});

	var ryu = Crafty.e('RyuCharacter').attr({
		x : 250,
		y : 110
	});
	var ken = Crafty.e('KenCharacter').attr({
		x : 50,
		y : 110
	});

});
