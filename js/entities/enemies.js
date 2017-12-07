me.BasicEnemyEntity = me.Entity.extend({
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

            // make it walk
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
        if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
            // res.y > 0 means touched by something on the bottom
            if (this.alive && (response.overlapV.y > 0) && other.body.falling) {
                // update other's status (implement it here to ensure the failing and jumping status haven't been affected by previous collision handling functions)
                other.body.falling = false;
                other.body.vel.y = -other.body.maxVel.y * me.timer.tick;
                other.body.jumping = true;
                // move other's position out of the enemy
                other.body.entity.pos.sub(response.overlapV);

                // update status for enemy itself
                this.lifePoint--;
                if(this.lifePoint <= 0) {
                    me.game.world.removeChild(this);
                }
                else {
                    this.renderable.flicker(750);
                }
            }
            return false;
        }
        // make all other objects solid
        return true;
    },

    changeVelByRatio: function(ratio){
        // walking & jumping speed
        this.body.setVelocity(ratio * this.velocity.x, ratio * this.velocity.y);
    },

    changeVelocity: function(vel){
        // walking & jumping speed
        this.body.setVelocity(vel.x, vel.y);
    },

});

/**
 * Life point of the basic enemy
 * @type Number
 * @name lifePoint
 * @memberOf game.EnemyEntity
 */
Object.defineProperty(me.BasicEnemyEntity.prototype, "lifePoint", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 2
});

/**
 * Entities that represent general enemies.
 */
game.EnemyEntity = me.BasicEnemyEntity.extend({

    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "snail";

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.framewidth = settings.width = 64;
        settings.frameheight = settings.height = 64;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX = x + width - settings.framewidth;
        this.pos.x = x + width - settings.framewidth;

        // to remember which side we were walking
        this.walkLeft = false;

        // walking & jumping speed
        this.body.setVelocity(this.velocity.x, this.velocity.y);

    }

});

game.EnemyEntity.prototype.velocity = {
    x: 4,
    y: 6
}


/**
 * An enemy object that floats and moves.
 */
game.FloatingEnemyEntity0 = me.BasicEnemyEntity.extend({

    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "bird1";

        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;

        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.framewidth = settings.width = 80;
        settings.frameheight = settings.height = 64;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

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
        this.body.setVelocity(this.velocity.x, this.velocity.y);

    }
});
game.FloatingEnemyEntity0.prototype.velocity = {
    x: 4,
    y: 10
}

/**
 * Life point of the enemy
 * @type Number
 * @name lifePoint
 * @memberOf game.EnemyEntity
 */
Object.defineProperty(game.FloatingEnemyEntity0.prototype, "lifePoint", {
    enumerable: true,
    configurable: false,
    writable: true,
    value: 3
});
