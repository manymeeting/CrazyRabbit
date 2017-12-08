/*
* // According to the suggestion from MelonJS, User-defined collision types are defined using BITWISE LEFT-SHIFT:
* game.collisionTypes = {
*     LOCKED_DOOR : me.collision.types.USER << 0,
*     OPEN_DOOR   : me.collision.types.USER << 1,
*     LOOT        : me.collision.types.USER << 2,
* };
*
* // Set collision type for a door entity
* myDoorEntity.body.collisionType = game.collisionTypes.LOCKED_DOOR;
*/

game.collisionTypes = {
    TOUCH_DEATH : me.collision.types.USER << 0, // Used when the player touches the water, fire or other "death" entities.
    MOVING_BLOCK : me.collision.types.USER << 1, // Used when the player touches moving block entities.
    MAGIC_ITEM : me.collision.types.USER << 2 // Used when the player touches magic item entities.
};