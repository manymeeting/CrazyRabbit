(function() {

	FreezerFacade = function() {
		
		this._enemyEnties = [];
		this._floatingEnemyEntity0s = [];
		this._movingBlockEntity0s = [];
	}

	FreezerFacade.prototype.pauseFor3S = function()
	{
		let _enemyEnties = this._enemyEnties;
		_enemyEnties = me.game.world.getChildByType(game.EnemyEntity);

		for (let i = 0; i < _enemyEnties.length; i++) {
			let enemyEntity = _enemyEnties[i];
			let vel = enemyEntity.velocity;
			// pause them
			enemyEntity.changeVelByRatio(0);
			// recover after 3s
			setTimeout(function () {
		        enemyEntity.changeVelocity({
					x: vel.x,
					y: vel.y
				});
		    }, 10000);
		}
	}

	// export this class
	game.FreezerFacade = FreezerFacade;

})();
