package com.hellespontus.engine.core;
class Entity implements IEntity{

    private var values:Array<Float>;
    public var id:Int;
    public var user:IUser;

    public function new() {
        values = new Array<Float>();
    }

    public function interpolate(distance:Float, _to:IEntity):Void {
        var other:Entity = cast(_to, Entity);
        for(i in 0...values.length){
            values[i] = values[i] + (other.values[i] - values[i]) * distance;
        }
    }

    public function advance(delta:Int):Void {

    }

    public function apply(command:ICommand):Void {

    }

    public function clone():IEntity {
        var e = initClone();
        e.id = this.id;
        e.user = this.user;
        e.values = this.values.copy();
        return e;
    }

    private function initClone():Entity {
        return Type.createInstance(Type.getClass(this), []);
    }

    public function toString():String {
        return '[Entity($values)]';
    }

    private function round(v:Float):Float {
        return Std.int(v * 10000) / 10000;
    }    
}
