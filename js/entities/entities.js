/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init: function(x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(3, 15);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk", [0, 1, 2, 3]);

        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand", [0]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");
    },

    /**
     * update the entity
     */
    update: function(dt) {
        // REVIEW: "const" is for constants, whose value is independant from conditions in the application. Please use let or var to define it.
        const isForward = me.input.isKeyPressed('right') ? 1 : (me.input.isKeyPressed('left') ? -1 : 0);
        // REVIEW: Nice catch! The original code has some unecessary duplicate lines so it's a great idea to refactor it.
        // To make it easier to understand, I think we can rename "isForward" to "direction".
        if (isForward !== 0) {
            // moved
            // flip the sprite on horizontal axis
            this.renderable.flipX(isForward < 0);
            // update the entity velocity
            this.body.vel.x = isForward * this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.body.vel.x = 0;

            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        // REVIEW: Nice refactoring here! Please also include the original comment :)
        if (me.input.isKeyPressed('jump') && !this.body.jumping && !this.body.falling) {
            // set current vel to the maximum defined value
            // gravity will then do the rest
            this.body.vel.y = -this.body.maxVel.y * 3 * me.timer.tick;

            // set the jumping flag
            this.body.jumping = true;
            me.audio.play("jump");
        }
        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
     * collision handler
     * (called when colliding with other objects)
     */
    onCollision: function(response, other) {
        switch (response.b.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
                if (other.type === "platform") {
                    if (this.body.falling && !me.input.isKeyPressed('down') &&

                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&

                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;

                        // Respond to the platform (it is solid)
                        return true;
                    }

                    // Do not respond to the platform (pass through)
                    return false;
                }
                break;



        // Make the object solid
        return true;
    },

    /**
     * Do on player die (add prefix to avoid compatibility issue with future verison fo Melon)
     * (called when die condition is reached)
     */
    //REVIEW: I understand that this name looks pretty, however, the prefix was added to avoid compatibility issue (please see my comment above). Call me if you are not sure about what I mean.
    onCharacterDie: function()
    {
        // remove the player from the screen (to avoid continuous collision)
        me.game.world.removeChild(this);
        me.audio.fade("bgm2",1,0,10);
        me.audio.play("death", false, function(){
            // go back to menu on music ends
            me.state.change(me.state.MENU);
        });
    }
});

/**
 * Dead score of the player
 * @type Number
 * @name DEAD_SCORE
 * @memberOf game.PlayerEntity
 */
Object.defineProperty(game.PlayerEntity.prototype, "DEAD_SCORE", {
    enumerable: true,
    configurable: false,
    writable: false,
    value: -5
});

/**
 * Enenties that represent coins. The player is able to collect coins and accumulate its game score.
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
        // do something when collected
        game.data.score += 250;
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        // remove it
        me.game.world.removeChild(this);

        return false
    }
});

/**
 * Entities that when touched will end the game.
 */
game.DeathEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y, settings]);
    },
    onCollision: function(response, other) {
        other.onCharacterDie();
        return false
    }
})


/**
 * Entities that represent general enemies.
 */
game.EnemyEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "wheelie_right";

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
        this.endX = x + width - settings.framewidth
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
    }
});

/**
 * Life point of the enemy
 * @type Number
 * @name lifePoint
 * @memberOf game.EnemyEntity
 */
Object.defineProperty(game.EnemyEntity.prototype, "lifePoint", {
    enumerable: true,
    configurable: false,
    writable: true,
    value: 2
});
