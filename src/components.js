/* 
 * GAME COMPONENTS
 */
//Crafty.c('BasePlatform', {
//    init: function() {
//        this.requires('2D, Canvas, Solid', 'Color')
//            .color('rgb(255,0,0)');
//    }
//});

Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('2D, Canvas, Collision, Gravity');
    }
});

Crafty.c('KenCharacter', {
    init: function() {
        this.requires('PlayerCharacter, SpriteAnimation, ken_punch')
            .animate('PlayerIdle', [[0,0], [0,1], [1,0]])
            .animate('PlayerIdle', 45, -1)
            .flip('X');
    }
});

Crafty.c('RyuCharacter', {
    init: function() {
        this.requires('PlayerCharacter, SpriteAnimation, ryu_punch, Twoway')
            //.gravity("platform")
            .onHit('Solid', this.stopMovement)
            .animate('PlayerIdle', 0, 0, 2)
            .animate('PlayerIdle', 40, -1)
            .twoway(4);
    }
});


