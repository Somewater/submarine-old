package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.Entity;

class Entity2D extends Entity{

    private static inline var X:Int =   0;
    private static inline var Y:Int =   1;
    private static inline var VX:Int =  2;
    private static inline var VY:Int =  3;
    private static inline var AY:Int =  4;
    private static inline var AY:Int =  5;

    public var accelerated:Bool;

    public function new() {
        super();
        accelerated = false;
    }

    public function initialize():Void {
        values = values.concat([0.0, 0.0, 0.0, 0.0]);
        if(accelerated)
            values = values.concat([0.0, 0.0]);
    }

    override public function advance(delta:Int):Void {
        if(accelerated){
            values[VX] += delta * values[AX];
            values[VY] += delta * values[AY];
        }
        values[X] += delta * values[VX];
        values[Y] += delta * values[VY];
    }

    public function x():Float return values[X];
    public function y():Float return values[Y];
    public function vx():Float return values[VX];
    public function vy():Float return values[VY];
    public function ax():Float return values[AX];
    public function ay():Float return values[AY];
}
