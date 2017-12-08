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

        // bing game.PlayerContext to this entity
        this.playerContext = new game.PlayerContext(this);

        // set PlayerContext state
        this.playerContext.setState(this.playerContext.VULNERABLE);
    },

    /**
     * update the entity
     */
    update: function(dt) {
        const isForward = me.input.isKeyPressed('right') ? 1 : (me.input.isKeyPressed('left') ? -1 : 0);
        if (isForward !== 0) {
            // moved
            // flip the sprite on horizontal axis
            this.renderable.flipX(isForward < 0);
            // update the entity velocity
            this.body.vel.x = isForward * this.body.accel.x * me.timer.tick;
            // change to the walking animation if not walking
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.body.vel.x = 0;

            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        // make sure we are not already jumping or falling
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

            case me.collision.types.ENEMY_OBJECT:
              return this.playerContext.respondToEnemy(response, other);
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

            case game.collisionTypes.TOUCH_DEATH:
                this.onDie();
                return false;
            case game.collisionTypes.MOVING_BLOCK:
                return true;
            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
        return true;
    },

    /**
     * Do on player die (add prefix to avoid compatibility issue with future version fo Melon)
     * (called when die condition is reached)
     */
    onDie: function()
    {
        // remove the player from the screen (to avoid continuous collision)
        me.game.world.removeChild(this);
        me.audio.fade("bgm2",1,0,10);
        me.audio.play("death", false, function() {
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
