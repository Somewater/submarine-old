package com.hellespontus.engine.core;

import haxe.ds.IntMap;
typedef TEntityCallback = IEntity -> Dynamic;

class EngineBase {

    public var user:IUser;
    private var entityListeners:IntMap<List<TEntityCallback>>;
    private var serverTimeDelta:Int;
    #if js
        private var startEngineTime:Float;
    #end

    public function new() {
        entityListeners = new IntMap<List<TEntityCallback>>();
        serverTimeDelta = 0;
        #if js
            startEngineTime = Date.now().getTime();
        #end
    }

    public function initialize(serverTime:Int):Void {
        serverTimeDelta = 0;
        serverTimeDelta = this.time() - serverTime;
    }

    public function addEntityListener(entityId:Int, callback:TEntityCallback):Void {
        var list:List<TEntityCallback> = entityListeners.get(entityId);
        if(list == null) {
            list = new List<TEntityCallback>();
            entityListeners.set(entityId, list);
        }
        list.add(callback);
    }

    public function removeEntityListener(entityId:Int, callback:TEntityCallback):Void {
        var list:List<TEntityCallback> = entityListeners.get(entityId);
        if(list != null)
            list.remove(callback);
    }

    public function isHost():Bool {
        return this.user != null && this.user.host;
    }

    public function time():Int {
        #if neko || php || cpp || cs || java
            return Sys.time() * 1000 - serverTimeDelta;
        #elseif flash
            return Std.int(flash.Lib.getTimer() - serverTimeDelta);
        #elseif js
            return Std.int(Date.now().getTime() - startEngineTime - serverTimeDelta);
        #end
    }
}
