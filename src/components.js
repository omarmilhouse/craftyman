/*
 * GAME COMPONENTS
 */

Crafty.c('MultiwayAdvanced', {
    init: function() {
        this.requires('Multiway')
    },
    multiwayadv: function(speed, keys) {
        //this.multiway(speed, {W: -90, S: 90, D: 0, A: 180});
        this.multiway(speed, keys);
        
//        this.bind('KeyDown', function(_key) {
//            for(var key in this._keys) {
//                if(key == String.fromCharCode(_key.key)) {
//                    console.log('down');
//                    this.trigger("onKeyDown", speed, _key);
//                }
//            }
//        });
        this.bind('KeyUp', function(_key) {
//            for(var key in keys) {
//                if(key == String.fromCharCode(_key.key)) {
//                    console.log('up');
//                    this.trigger("onKeyUp", speed, _key);
//                }
//            }
        });
        
        return this;
    }
    
});

Crafty.c('MultiwayWASD', {
    init: function() {
        this.requires('MultiwayAdvanced')
    },
    multiwaywasd: function(speed) {
        //this.multiway(speed, {W: -90, S: 90, D: 0, A: 180});
        var keys = {W: -90, D: 0, A: 180};
        this.multiwayadv(speed, keys);
        
        return this;
    }
    
});

Crafty.c('MultiwayArrows', {
    init: function() {
        this.requires('MultiwayAdvanced')
    },
    multiwayarrows: function(speed) {
        //this.multiway(speed, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
        var keys = {UP_ARROW: -90, RIGHT_ARROW: 0, LEFT_ARROW: 180};
        this.multiwayadv(speed, keys);
            
        return this;
    }
});


Crafty.c('PlayerCharacter', {
        _sprites : {},
        _name : 'Player',
        _currentSprite : '',
        
	init : function() {
		this.requires('2D, Canvas, Collision, Gravity, SpriteAnimation');
		this.gravity("Platform");
		this.onHit('Solid', this.stopMovement);
		//this.twoway(4, 6)
		this.CurrentAnimationSprite = '';

                this.bind('NewDirection', function(data) {
                    console.log(data);
                    if(data.x == 0 && data.y == 0) {
                        this.idle();
                    } 
                    
                    if(data.y < 0) {
                        this.jump();
                    } else if(data.x > 0 || data.x < 0) {
                        this.walk();
                    }
                    
                });              
                
                this.bind('Moved', function(data) {
                    if(this.x <= 0) {
                        this.x = 0;
                    }
                    if(this.x >= 350) {
                        this.x = 350;
                    }
                    
                    //this.removeComponent(this.CurrentAnimationSprite);
                });
                /*
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
                */
		this.bind('AnimationEnd', function(e) {

		});
	},
        setSprites: function(sprites) {
            this._sprites = sprites;
            this.idle();
        },
        
        idle: function() {
            if(this.isPlaying(this._sprites.idle)) return;
            this.stop();
            
            if(this._currentSprite) {
                this.removeComponent(this._currentSprite);
            }
            
            this._currentSprite = this._sprites.idle;
            this.addComponent(this._currentSprite);
            this.animate(this._currentSprite, 0, 0, 3);
            this.animate(this._currentSprite, 40, -1);            
        },
        walk: function() {
            if(this.isPlaying(this._sprites.walk)) return;
            
            if(this._currentSprite) {
                this.removeComponent(this._currentSprite);
            }
            
            this._currentSprite = this._sprites.walk;
            this.addComponent(this._currentSprite);
            this.animate(this._currentSprite, 0, 0, 4);
            this.animate(this._currentSprite, 40, -1);            
        },
        jump: function() {
            if(this.isPlaying(this._sprites.jump)) return;
            
            if(this._currentSprite) {
                this.removeComponent(this._currentSprite);
            }
            
            this._currentSprite = this._sprites.jump;
            this.addComponent(this._currentSprite);
            this.animate(this._currentSprite, 0, 0, 5);
            this.animate(this._currentSprite, 40, 0);            
        }
        
});

Crafty.c('RyuCharacter', {
	init : function() {
		this.requires('PlayerCharacter, MultiwayArrows');
                this.multiwayarrows(5);
                this._name = 'Ryu';
                
                this.setSprites({
                    idle : 'ryu_idle',
                    walk : 'ryu_walking',
                    jump : 'ryu_jump'
                });
	}
});

Crafty.c('KenCharacter', {
	init : function() {
		this.requires('PlayerCharacter, MultiwayWASD')
                    .multiwaywasd(5);
                    
                this._name = 'Ken';
                this.setSprites({
                    idle : 'ken_idle',
                    walk : 'ken_walking',
                    jump : 'ken_jump'
                });                    
	}
});
