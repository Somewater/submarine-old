package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.Entity;

class Entity2DRotated extends Entity2D{

    private static inline var ANGLE:Int =  4;
    private static inline var VANGLE:Int =  5;
    private static inline var AANGLE:Int =  6;

    public function new() {
        super();
    }

    override public function initialize():Void {
        super.initialize();
        values = values.concat([0.0, 0.0]);
        if(accelerated)
            values.push(0.0);
    }

    override public function advance(delta:Int):Void {
        super.advance(delta);
        if(this.accelerated)
            values[VANGLE + ACCELERATION_SHIFT] += delta * values[AANGLE + ACCELERATION_SHIFT];
        values[ANGLE + ACCELERATION_FIX()] += delta * values[VANGLE + ACCELERATION_FIX()];
    }

    private static inline var ACCELERATION_SHIFT:Int = 2;
    private inline function ACCELERATION_FIX():Int {
        if(this.accelerated)
            return ACCELERATION_SHIFT;// +2 позиции занимают значения усктрений
        else
            return 0;
    }

    public var angle(get,set):Float;
    public function get_angle():Float { return values[ANGLE + ACCELERATION_FIX()]; }
    public function set_angle(v:Float):Float { return values[ANGLE + ACCELERATION_FIX()] = v; }

    public var vangle(get,set):Float;
    public function get_vangle():Float { return values[VANGLE + ACCELERATION_FIX()]; }
    public function set_vangle(v:Float):Float { return values[VANGLE + ACCELERATION_FIX()] = v; }

    public var aangle(get,set):Float;
    public function get_aangle():Float { return values[AANGLE + ACCELERATION_SHIFT]; }
    public function set_aangle(v:Float):Float { return values[AANGLE + ACCELERATION_SHIFT] = v; }

    override public function toString():String {
        return 'E2d(x=${Std.int(x)}, y=${Std.int(y)}, vx=${round(vx)}, vy=${round(vy)}, angle=${Std.int(angle)}, av=${round(vangle)}, })';
    }
}
