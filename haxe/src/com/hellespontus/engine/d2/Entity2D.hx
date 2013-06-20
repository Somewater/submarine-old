package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.Entity;

class Entity2D extends Entity{

    private static inline var X:Int =   0;
    private static inline var Y:Int =   1;
    private static inline var VX:Int =  2;
    private static inline var VY:Int =  3;

    public function new() {
        super();
    }

    override public function advance(delta:Int):Void {
        values[X] += delta * values[VX];
        values[Y] += delta * values[VY];
    }

    public function x():Float return values[X];
    public function y():Float return values[Y];
    public function vx():Float return values[VX];
    public function vy():Float return values[VY];
}
