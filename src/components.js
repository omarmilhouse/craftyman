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
        
        this.bind('KeyDown', function(key) {
            if(key.key == Crafty.keys['T']) {
                this.trigger('onPunch');
            }
        })
        this.bind('KeyUp', function(key) {
            if(key.key == Crafty.keys['T']) {
                this.trigger('afterPunch');
            }
        })
        
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
        
        this.bind('KeyDown', function(key) {
            if(key.key == Crafty.keys['M']) {
                this.trigger('onPunch');
            }
        })
        this.bind('KeyUp', function(key) {
            if(key.key == Crafty.keys['M']) {
                this.trigger('afterPunch');
            }
        })        
            
        return this;
    }
});


Crafty.c('PlayerCharacter', {
        _sprites : {},
        _status : 'idle',
        _collision: false,
        _name : 'Player',
        _currentSprite : '',
        _spriteSingleFile: false,
        _opponent: false,
        _side: '',
        _spriteRow: '0',
        
	init : function() {
		this.requires('2D, Canvas, Collision, Gravity, SpriteAnimation');
		this.gravity("Platform");
		this.onHit('Solid', this.stopMovement);
                
                this.bind('NewDirection', function(data) {
                    if(data.x == 0 && data.y == 0) {
                        this.execute('idle');
                    } 
                    
                    if(data.y < 0) {
                        //this.jump();
                        //this.execute('jump');
                    } else if(data.x > 0 || data.x < 0) {
                        //this.walk();
                    }
                    
                    
                });              
                
                this.bind('Moved', function(data) {
                    if(this._status == 'punch') {
                        this.x = data.x;
                        this.y = data.y;
                    } else {
                        if(this.x != data.x)
                            this.execute('walk');
                        else if(this.y != data.y)
                            this.execute('jump');
                    }
                    
                    if(this.x <= 0) {
                        this.x = 0;
                    }
                    if(this.x >= 350) {
                        this.x = 350;
                    }
                    
                    if(this._side == 'l') {
                        if(this.x > this._opponent.x) {
                            this.flip('X');
                            this._opponent.unflip('X');
                        } else {
                            this.unflip('X');
                            this._opponent.flip('X');
                        }
                        
                    } else if(this._side == 'r') {
                        if(this.x < this._opponent.x) {
                            this.unflip('X');
                            this._opponent.flip('X');
                        } else {
                            this.flip('X');
                            this._opponent.unflip('X');
                        }
                    }
                });
                
		this.bind('onPunch', function() {
                    this.execute('punch');
		});
                
		this.bind('afterPunch', function() {
                    //this.execute('idle');
		});
                
                this.bind('EnterFrame', function(){
                    
                    this.updateAnimation();
                });
                
	},
        updateAnimation: function() {
            if(this._status == 'idle') {
                this.idle();
            } else if(this._status == 'walk') {
                this.walk();
            } else if(this._status == 'jump') {
                this.jump();
            } else if(this._status == 'punch') {
                this.punch();
            }            
        },
        execute: function(status) {
            if(status == 'punch') {
                if(this._status == 'idle' || this._status == 'walk') 
                    this._status = status;
            } else if(status == 'walk') {
                if(this._status != 'punch') 
                    this._status = status;
            } else
                this._status = status;
        },
        setSprites: function(sprites) {
            this._sprites = sprites;
            this.execute('idle');
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
            
            //this._status = 'idle';
        },
        walk: function() {
            if(!(this._sprites.walk)) return;
            var sprite = this._sprites.walk;
            if(this.isPlaying(sprite)) return;
            
            this.stop();
            
            if(this._spriteSingleFile) {
                this.animate(sprite, 0, 1, 4);
            } else {
                this.animate(sprite, 0, 0, 4);
            }
            
            if(this._currentSprite) {
                this.removeComponent(this._currentSprite);
            }
            
            this._currentSprite = sprite;
            this.addComponent(this._currentSprite);
            
            this.animate(this._currentSprite, 40, -1); 
            
            //this._status = 'walk';
        },
        jump: function() {
            if(!(this._sprites.jump)) return;
            if(this.isPlaying(this._sprites.jump)) return;
            
            this.stop();
            
            if(this._currentSprite) {
                this.removeComponent(this._currentSprite);
            }
            
            this._currentSprite = this._sprites.jump;
            this.addComponent(this._currentSprite);
            this.animate(this._currentSprite, 0, this._spriteRow, 5);
            this.animate(this._currentSprite, 40, 0);            
            
            //this._status = 'jump';
        },
        punch: function() {
            if(!(this._sprites.punch)) return;
            var sprite = this._sprites.punch;
            if(this.isPlaying(sprite)) return;
            
            this.unbind('AnimationEnd');
            
            if(this._currentSprite) {
                this.removeComponent(this._currentSprite);
            }
            
            this._currentSprite = sprite;
            this.addComponent(this._currentSprite);
            this.animate(this._currentSprite, 0, this._spriteRow, 2);
            this.animate(this._currentSprite, 15, 0); 
            
            this.bind('AnimationEnd', function() {
                this.execute('idle');
            })
        }
        
});

Crafty.c('RyuCharacter', {
	init : function() {
		this.requires('PlayerCharacter, MultiwayArrows');
                this.multiwayarrows(5);
                this._name = 'Ryu';
                this._spriteRow = 1;
                
                this.setSprites({
                    idle : 'ryu_idle',
                    walk : 'ryu_walk',
                    jump : 'ryu_jump',
                    punch : 'ryu_punch'
                });
                
                this._spriteSingleFile = true;
	}
});

Crafty.c('KenCharacter', {
	init : function() {
		this.requires('PlayerCharacter, MultiwayWASD')
                    .multiwaywasd(5);
                    
                this._name = 'Ken';
                this.setSprites({
                    idle : 'ken_idle',
                    walk : 'ken_walk',
                    jump : 'ken_jump',
                    punch : 'ken_punch'
                });    

                this._spriteSingleFile = true;
	}
});
