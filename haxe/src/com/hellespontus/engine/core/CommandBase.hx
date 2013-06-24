package com.hellespontus.engine.core;
class CommandBase implements ICommand{

    public var time:Int;
    public var type:Int;
    public var id:Int;

    public function new(type:Int) {
        this.type = type;
    }

    public function execute(world:IWorld):IWorld {
        throw "Implement execute method";
        return null;
    }
}
