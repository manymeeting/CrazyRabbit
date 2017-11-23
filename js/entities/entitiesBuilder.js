/**
 * A generic builder <br>
 * @class
 * @memberOf me.diablo
 * @param {buildSettings.isMoveable} e.g. true
 * @param {buildSettings.initVel} e.g. [3,15]
 * @param {buildSettings.letScreenFollow} e.g. false
 * @param {buildSettings.alwaysUpdate} default: true
 * @param {buildSettings.animations} e.g. {
	walk: [0, 1, 2, 3],
	stand: [0],
	init: "stand"
 }
 * @param {me.Rect[]|me.Polygon[]|me.Line[]|me.Ellipse[]} [shapes] the initial list of shapes
 */
(function() {
	// EntitiesBuilder is designed to be static
	EntitiesBuilder = function(){};

	EntitiesBuilder.create = function(buildSettings) {

		const entity = me.Entity.extend({});

		entity.prototype.init = function(x, y, settings) {
			// call the constructor
    		this._super(me.Entity, 'init', [x, y, settings]);	

    		if(buildSettings.isMoveable)
    		{
    			EntitiesBuilder._setMovements(this, buildSettings);
    		}

		};

		entity.prototype.update = function() {
			
		};

		entity.prototype.mutate = function() {

		};

		return entity;
	}

	EntitiesBuilder._setMovements = function(entity, buildSettings)
	{
		// set the default horizontal & vertical speed (accel vector)
		entity.body.setVelocity(buildSettings.initVel.x, buildSettings.initVel.y);

		// decide whether the screen should follow this entity or not 
		if(buildSettings.letScreenFollow)
		{
			// set the display to follow our position on both axis
			me.game.viewport.follow(entity.pos, me.game.viewport.AXIS.BOTH);
		}

		// ensure the player is updated even when outside of the viewport
		entity.alwaysUpdate = buildSettings.alwaysUpdate === false ? false : true;

		// define a basic walking animation (e.g. using all frames)
        entity.renderable.addAnimation("walk", buildSettings.animations.walk);

        // define a standing animation (e.g. using the first frame)
        entity.renderable.addAnimation("stand", buildSettings.animations.stand);

        // set the default animation
        entity.renderable.setCurrentAnimation(buildSettings.animations.init);
	}

	// expose EntitiesBuilder
	me.diablo = me.diablo ? me.diablo : {};
	me.diablo.EntitiesBuilder = EntitiesBuilder;
})();


