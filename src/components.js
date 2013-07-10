/* 
 * GAME COMPONENTS
 */
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('2D, Canvas, Actor, Twoway, Collision, Gravity')
            .twoway(4)
    }
});

Crafty.c('KenCharacter', {
    init: function() {
        this.requires('PlayerCharacter, SpriteAnimation, ken_punch');
    }
});

Crafty.c('RyuCharacter', {
    init: function() {
        this.requires('PlayerCharacter, SpriteAnimation, ryu_punch');
    }
});


