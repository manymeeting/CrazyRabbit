/**
 * Entities that when touched will end the game.
 */
game.DeathEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);

        // set a custom collision type
        this.body.collisionType = game.collisionTypes.TOUCH_DEATH;
    }
})


/**
 * Entities that will end the game.
 */
game.WinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function(response, other) {
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        this.winnerMusicControl();
        // remove it
        me.game.world.removeChild(this);

        // win when collected
        me.state.change(me.state.GAME_END);

        return false;
    },

    winnerMusicControl: function()
        {
            // remove the player from the screen (to avoid continuous collision)
            me.game.world.removeChild(this);
            me.audio.fade("bgm2",1,0,10);
            me.audio.play("winner", false);
        }
});
