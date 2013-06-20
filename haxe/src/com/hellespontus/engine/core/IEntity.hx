package com.hellespontus.engine.core;
interface IEntity {
    var id:Int;
    var interpolable:Bool;
    var user:IUser;

    function interpolate(distance:Float, _to:IEntity):Void;

    function advance(delta:Int):Void;

    function apply(command:ICommand):Void;

    function clone():IEntity;
}
