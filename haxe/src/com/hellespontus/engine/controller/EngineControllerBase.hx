package com.hellespontus.engine.controller;
import haxe.Timer;
import com.hellespontus.engine.core.IWorld;
import com.hellespontus.engine.core.IEngine;
class EngineControllerBase {

    private var engine:IEngine;
    private var ticker:Ticker;
    private var lastTick:Float;

    public function new(engine:IEngine, ticker:Ticker) {
        this.engine = engine;
        this.ticker = ticker;
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
        //ticker.start();
        //ticker.add(tick, 50, this);
        var timer:Timer = new Timer(50);
        timer.run = cast tick;
    }

    private function tick(?delta:Int):Void {
        // engine.world();
        throw "Implement game logic";
        return null;
    }
}
