package com.hellespontus.engine.core;
/**
  * Usage:
  * var engine:IEngine = new EngineImpl()
  * var startRequest:Int = engine.time();
  * <callServerTime>(function(serverTimeMS){
  *     var requestTimeMs = engine.time() - startRequest;
  *     engine.initialize(serverTimeMS + requestTimeMs / 2);
  * })
 **/
interface IEngine {
    function initialize(serverTime:Int):Void;

    function addEntityListener(entityId:Int, callback: IEntity -> Dynamic):Void;
    function removeEntityListener(entityId:Int, callback: IEntity -> Dynamic):Void;

    function createEntity(?id:Int = -1, ?user:IUser = null):IEntity;
    function createUser(?id:Int = -1):IUser;

    function world():IWorld;
    var user:IUser;
    function isHost():Bool;

    function time():Int;// synchronized with server
    function addState(world:IWorld):Void;
}
