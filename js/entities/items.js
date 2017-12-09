/**
 * Entities that represent coins. The player is able to collect coins and accumulate its game score.
 */
game.CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function(response, other) {
        if (response.b.body.collisionType !== me.collision.types.ENEMY_OBJECT ) {
            // do something when collected
            game.data.score += 10;
            // make sure it cannot be collected "again"
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            console.log(1);
            // remove it
            me.game.world.removeChild(this);
            return false;
        }
    }
});

/**
 * Entities that represent a timer. The player is able to collect coins and pause all the enemies in the map.
 */
game.TimerEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function(response, other) {
        // do something when collected
        game.data.score += 250;
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        // remove it
        me.game.world.removeChild(this);

        // pause
        game.FreezerFacade.pauseFor3S();

        return false;
    }
});

/**
 * Entities that represent a timer. The player is able to collect coins and pause all the enemies in the map.
 */
game.MagicItemEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);

        this.body.collisionType = game.collisionTypes.MAGIC_ITEM;
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function(response, other) {
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        // remove it
        me.game.world.removeChild(this);

        return false;
    }
});
