package com.hellespontus.engine.core;
interface IWorld {
    function add(item:IEntity):Bool;

    function remove(item:IEntity):Bool;

    function apply(command:ICommand):Void;

    function clone():IWorld;

    function time():Int;

    function interpolate(time:Int, _to:IWorld):Void;

    function advance(delta:Int):Void;

    function get(id:Int):IEntity;

    function has(id:Int):Bool;
}
