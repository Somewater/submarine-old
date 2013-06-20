package com.hellespontus.engine.core;
class Entity implements IEntity{

    private var values:Array<Float>;
    public var id:Int;
    public var interpolable:Bool;
    public var user:IUser;

    public function new() {
        values = new Array<Float>();
    }

    public function interpolate(_from:IEntity, distance:Float):Void {
        var other:Entity = cast(_from, Entity);
        for(i in 0...values.length){
            values[i] = (values[i] - other.values[i]) * distance +  other.values[i];
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
        e.interpolable = this.interpolable;
        e.values = this.values.copy();
        return e;
    }

    private function initClone():Entity {
        return Type.createInstance(Type.getClass(this), []);
    }
}
