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
	Crafty.load(['assets/ken_sprite.gif', 'assets/Ryu/ryu_idle.png', 'assets/Ryu/ryu_walking.png', 'assets/Ryu/ryu_jump.png', 'assets/bg.gif'], function() {

		// Inizializzazione sprite

		Crafty.sprite(50, 105, 'assets/ken_sprite.gif', {
			ken_idle : [0, 0]
		});

		Crafty.sprite(50, 105, 'assets/Ryu/ryu_idle.png', {
			ryu_idle : [0, 0]
		});

		Crafty.sprite(49, 105, 'assets/Ryu/ryu_walking.png', {
			ryu_walking : [0, 0]
		});

		Crafty.sprite(49, 105, 'assets/Ryu/ryu_jump.png', {
			ryu_jump : [0, 0]
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
	ryu.flip('X');
	
	var ken = Crafty.e('KenCharacter').attr({
		x : 50,
		y : 110
	});

});
