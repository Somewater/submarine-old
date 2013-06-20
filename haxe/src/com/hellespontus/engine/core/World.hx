package com.hellespontus.engine.core;

import haxe.ds.IntMap;

class World implements IWorld{

    private var entities:Array<IEntity>;
    private var entitiesById:IntMap<IEntity>;
    private var _time:Int;

    public function new(time:Int) {
        entities = new Array<IEntity>();
        entitiesById = new IntMap<IEntity>();
        _time = time;
    }

    public function add(item:IEntity):Bool {
        if(item.id <= 0)
            throw "Entity has not id";
        if(entitiesById.get(item.id) == null){
            entitiesById.set(item.id, item);
            entities.push(item);
            return true;
        }
        return false;
    }

    public function remove(item:IEntity):Bool {
        if(entitiesById.get(item.id) != null){
            entitiesById.remove(item.id);
            entities.remove(item);
            return true;
        }
        return false;
    }

    public function get(id:Int):IEntity {
        return entitiesById.get(id);
    }

    public function has(id:Int):Bool {
        return entitiesById.get(id) != null;
    }

    public function apply(command:ICommand):Void {
        for(e in entities)
            e.apply(command);
    }

    public function clone():IWorld {
        var m:World = initClone();
        for(e in entities)
            m.add(e.clone());
        return m;
    }

    public function interpolate(time:Int, _to:IWorld):Void {
        var distance:Float = (time - this.time()) / (_to.time() - this.time());
        for(entity in entities){
            entity.interpolate(distance, _to.get(entity.id));
        }
        this._time = time;
    }
    
    public function advance(delta:Int):Void {
        for(entity in entities)
            entity.advance(delta);
        this._time += delta;
    }

    public function time():Int {
        return _time;
    }

    private function initClone():World {
        return new World(this.time());
    }
}
