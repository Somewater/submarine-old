package com.hellespontus.engine.controller;
import com.hellespontus.engine.core.IServer;
import haxe.Timer;
import com.hellespontus.engine.core.IWorld;
import com.hellespontus.engine.core.IEngine;
class EngineControllerBase {

    public static var PHYSIC_TICK_RATE:Int = 20;
    public static var SERVER_SYNC_RATE:Int = 200;// как часто отправляет состояние мира игрокам
    public static var CLIENT_SYNC_RATE:Int = 50;// как часто отправляет инпуты на сервер
    public static var RENDER_RATE:Int = 33;

    private var engine:IEngine;
    private var ticker:Ticker;
    private var lastTick:Float;
    private var server:IServer;

    public function new(engine:IEngine, ticker:Ticker, server:IServer) {
        this.engine = engine;
        this.ticker = ticker;
        this.server = server;
        this.lastTick = 0;
    }

    public function setup():Void{
        throw "Override me";
    }
    
    public function start():Void {
        setup();
        connectToServer();
    }

    private function connectToServer():Void {
        // engine.addState(world);
        // engine.initialize();
        throw "Connect to server & initialize world";
    }

    public function onEngineInitialized():Void {
        var minimalRate:Int = Std.int(Math.min( Math.min(PHYSIC_TICK_RATE, SERVER_SYNC_RATE),
                                                Math.min(CLIENT_SYNC_RATE, RENDER_RATE)));
        ticker.start(minimalRate);
        ticker.add(onPhysicTick, PHYSIC_TICK_RATE);
        ticker.add(onRenderTick, RENDER_RATE);
        if(engine.isHost()){
            ticker.add(onServerTick, SERVER_SYNC_RATE);
        } else {
            ticker.add(onClientTick, CLIENT_SYNC_RATE);
        }
    }

    private function onPhysicTick(msDelta:Int):Void {
    
    }

    private function onRenderTick(msDelta:Int):Void {
        
    }

    private function onServerTick(msDelta:Int):Void {
            
    }

    private function onClientTick(msDelta:Int):Void {
        
    }
}
