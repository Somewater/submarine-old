package com.hellespontus.engine;
interface IEntity {
    var id:Int;
    var interpolable:Bool;
    function interpolate(_from:IEntity, distance:Float):Void;

    function advance(delta:Int):Void;

    function apply(command:ICommand):Void;

    function clone():IEntity;
}
