package com.hellespontus.engine.core;

import haxe.ds.IntMap;
typedef TEntityCallback = IEntity -> Dynamic;

class EngineBase implements IEngine{

    private static inline var MAX_STATES:Int = 10;
    private static inline var MAX_USER_COUNT:Int = 100;

    public var user:IUser;
    private var entityListeners:IntMap<List<TEntityCallback>>;
    private var serverTimeDelta:Int;
    #if js
        private var startEngineTime:Float;
    #end

    private var entityIdCounter:Int;
    private var userIdCounter:Int;
    private var worlds:Array<IWorld>;

    public function new() {
        entityListeners = new IntMap<List<TEntityCallback>>();
        serverTimeDelta = 0;
        #if js
            startEngineTime = Date.now().getTime();
        #end
        entityIdCounter = 1;
        userIdCounter = 1;
    }

    public function initialize(serverTime:Int):Void {
        serverTimeDelta = 0;
        serverTimeDelta = this.time() - serverTime;
    }

    public function createEntity(?id:Int = -1, ?user:IUser = null):IEntity {
        var e:IEntity = createEntityInstance();
        e.id = if(id == -1) generateEntityId(user) else id;
        e.user = user;
        return e;
    }

    private function createEntityInstance():IEntity {
        throw "Override me";
        return null;
    }

    public function createUser(?id:Int = -1):IUser {
        var u:User = new User();
        u.id = if(id == -1) generateUserId() else id;
        return u;
    }

    private function generateEntityId(?user:IUser = null):Int {
        return (entityIdCounter++) * MAX_USER_COUNT + (if(user != null) user.id else 0);
    }

    private function generateUserId():Int {
        return userIdCounter++ % MAX_USER_COUNT;
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

    public function addState(world:IWorld):Void {
        var time:Int = world.time();
        var append:Bool = true;
        for(i in 0...worlds.length){
            var w:IWorld = worlds[0];
            if(w.time() > time){
                append = false;
                worlds.insert(i, world);
                break;
            }
        }
        if(append)
            worlds.push(world);
        if(worlds.length > MAX_STATES)
            worlds.shift();
    }

    public function world():IWorld {
        var lerp:Int = user.lerp;
        var time:Int = this.time() - lerp;
        if(time < 0) time = 0;
        var selected:IWorld;

        if(worlds.length > 1){
            var _from:IWorld = null;
            var _to:IWorld = null;
            for(i in -worlds.length...1){
                var w:IWorld = worlds[i];
                if(w.time() > time){
                    _to = w;
                }else if(w.time() < time){
                    _from = w;
                    break;
                }else
                    return w;
            }
            if(_from == null){
                selected = _to;
            }else if(_to == null){
                selected = _from;
            }else{
                _from = _from.clone();
                _from.interpolate(time, _to);
                return _from;
            }
        } else if (worlds.length == 1) {
            selected = worlds[0];
        } else
            throw "No worlds";

        if(selected.time() < time){
            selected = selected.clone();
            selected.advance(time - selected.time());
        }
        return selected;
    }
}
