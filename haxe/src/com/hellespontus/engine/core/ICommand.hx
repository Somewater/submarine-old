package com.hellespontus.engine.core;
interface ICommand {
    var time:Int;
    var type:Int;
    var id:Int;

    function execute(world:IWorld):IWorld;
}
