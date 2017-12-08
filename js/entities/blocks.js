

/**
 * A block that moves.
 */
game.MovingBlockEntity0 = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "moving_block_01";

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.framewidth = settings.width = 138;
        settings.frameheight = settings.height = 64;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // set a custom collision type
        this.body.collisionType = game.collisionTypes.MOVING_BLOCK;

        // set body gravity to 0 for this entity (otherwise it will fall immediately)
        this.body.gravity = 0;

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX = x + width - settings.framewidth;
        this.pos.x = x + width - settings.framewidth;

        // to remember which side we were walking
        this.walkLeft = false;

        // walking & jumping speed
        this.body.setVelocity(4, 6);

    },

    /**
     * update the enemy pos
     */
    update: function(dt) {

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }

            // make it move
            this.renderable.flipX(this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }

        // update the body movement
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    onCollision: function(response, other) {
        return false;
    }
});

/**
 * A block that falling.
 */
game.FallingBlockEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "moving_block_01";

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.framewidth = settings.width = 138;
        settings.frameheight = settings.height = 64;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // set a custom collision type
        this.body.collisionType = game.collisionTypes.TOUCH_DEATH;

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX = x + width - settings.framewidth;
        this.pos.x = x + width - settings.framewidth;

        // to remember which side we were walking
        this.walkLeft = false;

        // walking & jumping speed
        this.body.setVelocity(0, 6);

    },

    /**
     * update the enemy pos
     */
    update: function(dt) {
        // update the body movement
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    onCollision: function(response, other) {
        return false;
    }
});

