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
            .onHit('Solid', this.stopMovement)
            .animate('PlayerIdle', [[0,0], [1,0], [2,0], [3,0]])
            .animate('PlayerIdle', 45, -1)
    }
});

Crafty.c('RyuCharacter', {
    init: function() {
        this.requires('PlayerCharacter, SpriteAnimation, ryu_walking, Twoway')
            .gravity("Platform")
            .onHit('Solid', this.stopMovement)
            //.animate('PlayerIdle', [[10,0], [11,0], [12,0],[13,0], [14,0], [15,0], [16,0]]) 
            .animate('PlayerIdle', 4, 0, 8)
            .animate('PlayerIdle', 40, -1)
            .twoway(4, 6)
            .flip('X');;
    }
});


