package com.hellespontus.engine.controller;
import haxe.Timer;
import Std;

typedef TickerBucket = {
    callback: Dynamic, 
    interval: Int, 
    delay: Int, 
    self: Dynamic, 
    args: Array<Dynamic>, 
    waiting: Int
}

class Ticker {
    #if js
        private var requestAnimationFrame: (Void -> Void) -> Void;
    #end
    
    private var lastTickTime:Float;
    private var tickers:Array<TickerBucket>;

    public function new() {
        lastTickTime = 0;
        tickers = new Array<TickerBucket>();
    }

    public function start(?minDeltaMs:Int):Void {
        #if js
            requestAnimationFrame =
            untyped window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame 
            || function(callback, element) {window.setTimeout(callback, 1000/60);};
            var cb: Dynamic = requestAnimationFrame;
            cb(globalTick);
        #else
            var timer:Timer = new Timer(minDeltaMs);
            timer.run = cast globalTick;
        #end
    }

    public function globalTick():Void {
        var tickTime:Float = Date.now().getTime();
        var dt:Int = this.lastTickTime != 0 ? Std.int(tickTime - this.lastTickTime) : 0;
        var tickersClone:Array<TickerBucket> = this.tickers.copy();
        for(i in 0...tickersClone.length){
            var t:TickerBucket = tickersClone[i];
            t.waiting += dt;
            if(t.delay <= 0 || (t.delay -= dt) <= 0){
                var args = if(t.args != null) t.args else [t.waiting];
                Reflect.callMethod(t.self, t.callback, args);
                if(t.interval != 0){
                    t.delay = t.interval;
                    t.waiting = 0;
                }else{
                    var idx = #if (js || flash)
                                  (cast this.tickers).indexOf(t);
                              #else
                                  Lambda.indexOf(this.tickers, t);
                              #end
                    if(idx > -1)
                        this.tickers.splice(idx, 1);
                }
            }
        }
        this.lastTickTime = tickTime;
        #if js
            var cb: Dynamic = requestAnimationFrame;
            cb(globalTick);
        #end
    }

    public function add(callback:Dynamic, 
                        msInterval:Int, 
                        ?self:Dynamic, 
                        ?args:Array<Dynamic>):Void {
        tickers.push({
            callback: callback, 
            interval: msInterval, 
            delay: msInterval, 
            self: self, 
            args: args, 
            waiting: 0
        });    
    }

    public function defer(callback: Dynamic, 
                          msDelay:Int, 
                          ?self: Dynamic, 
                          ?args:Array<Dynamic>):Void {
        this.tickers.push({
            callback: callback, 
            interval: 0,
            delay: msDelay, 
            self: self, 
            args: args, 
            waiting: 0
        });
    }

    public function remove(callback: Dynamic):Void {
        for(i in 0...tickers.length){
            if(this.tickers[i].callback == callback){
                this.tickers.splice(i, 1);
                return;
            }
        }
    }
}
