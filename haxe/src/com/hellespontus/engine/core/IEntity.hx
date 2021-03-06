package com.hellespontus.engine.core;
interface IEntity {
    var id:Int;
    var user:IUser;

    function interpolate(distance:Float, _to:IEntity):Void;

    function advance(delta:Int):Void;

    function clone():IEntity;
}
