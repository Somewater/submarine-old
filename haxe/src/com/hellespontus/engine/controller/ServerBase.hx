package com.hellespontus.engine.controller;
import com.hellespontus.engine.core.IUser;
import com.hellespontus.engine.core.ICommand;
import com.hellespontus.engine.core.IWorld;
import com.hellespontus.engine.core.IServer;
class ServerBase implements IServer{

    private var worldTranslator:IWorldTranslator;
    private var commandTranslator:ICommandTranslator;
    private var commandHandler:ICommand -> Int -> Void;
    private var syncHandler:IWorld -> Void;

    public function new(worldTranslator:IWorldTranslator, commandTranslator:ICommandTranslator) {
        this.worldTranslator = worldTranslator;
        this.commandTranslator = commandTranslator;
    }

    public function start(host:String, port:Int):Void{
        throw "Implement me";
    }

    public function sendSync(world:IWorld):Void {
        throw "Implement me";
    }

    public function setOnSyncHandler(handler:IWorld -> Void):Void {
        this.syncHandler = handler;
    }

    public function sendCommand(command:ICommand, currentUser:IUser):Void {
        throw "Implement me";
    }

    public function setOnCommandHandler(handler:ICommand -> Int -> Void):Void {
        this.commandHandler = handler;
    }
}
