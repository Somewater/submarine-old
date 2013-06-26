package com.hellespontus.engine.core;
interface IServer {
    function start(host:String, port:Int):Void;

    function sendSync(world:IWorld):Void;
    function setOnSyncHandler(handler:IWorld -> Void):Void;

    function sendCommand(command:ICommand, currentUser:IUser):Void;

    /**
     * handler(command:ICommand, userId:Int):Void
     */
    function setOnCommandHandler(handler:ICommand -> Int -> Void):Void;
}

interface IWorldTranslator{
    function encode(world:IWorld):Dynamic;
    function decode(data:Dynamic):IWorld;
}

interface ICommandTranslator{
    function encode(command:ICommand):Dynamic;
    function decode(data:Dynamic):ICommand;
}
