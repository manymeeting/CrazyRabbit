(function() {
	PlayerState = function() {
		this._context = null;
	};

	PlayerState.prototype.setContext = function(context) {
		this._context = context;
	}
	PlayerState.prototype.respondToEnemy = function(response, other) {};

	PlayerState.prototype.respondToCoins = function(response, other) {};

	PlayerState.prototype.respondToMagicItem = function(response, other) {};

	PlayerContext = function(playerEntity) {
		this._entity = playerEntity;
		this.VULNERABLE = new VulnerablePlayerState();
		this.GREEDY = new GreedyPlayerState();

		this.VULNERABLE.setContext(this);
		this.GREEDY.setContext(this);
	};

	PlayerContext.prototype.setState = function(newState) {
		this._state = newState;
	}

	PlayerContext.prototype.getState = function() {
		return this._state;
	}

	PlayerContext.prototype.respondToEnemy = function(response, other) {
		return this._state.respondToEnemy(response, other);
	}

	PlayerContext.prototype.respondToMagicItem = function(response, other) {
		return this._state.respondToMagicItem(response, other);
	}

	PlayerContext.prototype.respondToCoins = function(response, other) {
		return this._state.respondToCoins(response, other);
	}


	VulnerablePlayerState = function(){}
	VulnerablePlayerState.prototype = new PlayerState();
	VulnerablePlayerState.prototype.constructor = VulnerablePlayerState;

	VulnerablePlayerState.prototype.respondToEnemy = function(response, other) {
		if ((response.overlapV.y > 0) && !this._context._entity.body.jumping) {
	        // due to the implementation of me.Body.respondToCollision, we customize the collision response logic here and return false.
	        // e.g. when 0 < overlap.y < 1, respondToCollision will set this.falling to false, whereas we expect it to be true.
	        return false;
	    } else {
	        // let's flicker in case we touched an enemy
	        this._context._entity.renderable.flicker(750);
	        game.data.score -= 1;
	        if(game.data.score <= this._context._entity.DEAD_SCORE)
	        {
	            this._context._entity.onDie();
	        }
	        return false;
	    }
	};

	VulnerablePlayerState.prototype.respondToMagicItem = function(response, other) {
		this._context._entity.renderable.image = me.utils.getImage("advanced_main_character");
		this._context.setState(this._context.GREEDY);
	}

	GreedyPlayerState = function(){};
	GreedyPlayerState.prototype = new PlayerState();
	GreedyPlayerState.prototype.constructor = GreedyPlayerState;
	GreedyPlayerState.prototype.respondToEnemy = function(response, other) {
		if ((response.overlapV.y > 0) && !this._context._entity.body.jumping) {
	        // due to the implementation of me.Body.respondToCollision, we customize the collision response logic here and return false.
	        // e.g. when 0 < overlap.y < 1, respondToCollision will set this.falling to false, whereas we expect it to be true.
	        return false;
	    } else {
			// Yeah! We got more score!
	        game.data.score += 1;
	        return false;
	    }
	};
	GreedyPlayerState.prototype.respondToMagicItem = function(response, other) {
		// oh don't be so greedy...
		this._context._entity.renderable.image = me.utils.getImage("main_character");
		this._context.setState(this._context.VULNERABLE);
	};




	// export classes
	game.PlayerContext = PlayerContext;
	game.PlayerState = PlayerState;
	game.VulnerablePlayerState = VulnerablePlayerState;
	game.GreedyPlayerState = GreedyPlayerState;
})();
