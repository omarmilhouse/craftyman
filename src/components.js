/*
 * GAME COMPONENTS
 */

Crafty.c('PlayerCharacter', {
	init : function() {
		this.requires('2D, Canvas, Collision, Gravity, SpriteAnimation, Twoway');
		this.gravity("Platform");
		this.onHit('Solid', this.stopMovement);
		this.twoway(4, 6)
		this.CurrentAnimationSprite = '';

		this.IdleSprite = '';
		this.WalkingSprite = '';
		this.JumpSprite = '';

		//Questo metodo è da chiamare dopo che sono stati settati i vari sprite del relativo player
		this.SetCharacterAnimation = function() {
			//Setta l'animazione idle
			this.addComponent(this.IdleSprite);
			this.animate(this.IdleSprite, 0, 0, 3);
			this.animate(this.IdleSprite, 40, -1);
			this.CurrentAnimationSprite = this.IdleSprite;
		};

		this.bind('KeyDown', function(key) {

			this.reset();

			console.log(key.keyCode);

			if (key.keyCode == 38) {
				this.removeComponent(this.CurrentAnimationSprite);
				this.addComponent(this.JumpSprite);
				this.animate(this.JumpSprite, 0, 0, 7);
				this.animate(this.JumpSprite, 40, 0);
				this.CurrentAnimationSprite = this.JumpSprite;
			} else if (key.keyCode == 37 || key.keyCode == 39) {
				this.removeComponent(this.CurrentAnimationSprite);
				this.addComponent(this.WalkingSprite);
				this.animate(this.WalkingSprite, 0, 0, 4);
				this.animate(this.WalkingSprite, 40, -1);
				this.CurrentAnimationSprite = this.WalkingSprite
			}
		});

		this.bind('KeyUp', function(key) {
			//Torna all'animazione idle solo se non c'è un'animazione di jump in corso
			if (!this.isPlaying(this.JumpSprite)) {
				this.removeComponent(this.CurrentAnimationSprite);
				this.addComponent(this.IdleSprite);
				this.animate(this.IdleSprite, 0, 0, 3);
				this.animate(this.IdleSprite, 40, -1);
				this.CurrentAnimationSprite = this.IdleSprite;
			}
		});

		this.bind('AnimationEnd', function(e) {

		});
	}
});

Crafty.c('RyuCharacter', {
	init : function() {
		this.requires('PlayerCharacter')

		this.IdleSprite = 'ryu_idle';
		this.WalkingSprite = 'ryu_walking';
		this.JumpSprite = 'ryu_jump';

		this.SetCharacterAnimation(this);
	}
});

Crafty.c('KenCharacter', {
	init : function() {
		this.requires('PlayerCharacter');

		this.twoway(4, 6)

		//da modificare una volta fatti gli sprite
		this.IdleSprite = 'ken_idle';
		this.WalkingSprite = 'ken_idle';
		this.JumpSprite = 'ken_idle';

		this.SetCharacterAnimation(this);
	}
});
