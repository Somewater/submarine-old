package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.Entity;

class Entity2DRotated extends Entity2D{

    private static inline var ANGLE:Int =  4;
    private static inline var VANGLE:Int =  4;

    public function new() {
        super();
    }

    override public function advance(delta:Int):Void {
        super.advance(delta);
        values[ANGLE] += delta * values[VANGLE];
    }

    public function angle():Float return values[ANGLE];
    public function vangle():Float return values[VANGLE];
}
