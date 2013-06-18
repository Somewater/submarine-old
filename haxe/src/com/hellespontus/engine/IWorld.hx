package com.hellespontus.engine;
interface IWorld {
    function add(item:IEntity):Bool;

    function remove(item:IEntity):Bool;

    function apply(command:ICommand):Void;

    function clone():IWorld;

    function time():Int;

    function interpolate(time:Int, ?_from:IWorld):Void;

    function get(id:Int):IEntity;

    function has(id:Int):Bool;
}
