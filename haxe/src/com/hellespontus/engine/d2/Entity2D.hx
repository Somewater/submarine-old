package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.Entity;

class Entity2D extends Entity{

    private static inline var X:Int =   0;
    private static inline var Y:Int =   1;
    private static inline var VX:Int =  2;
    private static inline var VY:Int =  3;
    private static inline var AX:Int =  4;
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

    public var x(get,set):Float;
    public function get_x():Float { return values[X]; }
    public function set_x(v:Float):Float { return values[X] = v; }
    
    public var y(get,set):Float;
    public function get_y():Float { return values[Y]; }
    public function set_y(v:Float):Float { return values[Y] = v; }
    
    public var vx(get,set):Float;
    public function get_vx():Float { return values[VX]; }
    public function set_vx(v:Float):Float { return values[VX] = v; }
    
    public var vy(get,set):Float;
    public function get_vy():Float { return values[VY]; }
    public function set_vy(v:Float):Float { return values[VY] = v; }
    
    public var ax(get,set):Float;
    public function get_ax():Float { return values[AX]; }
    public function set_ax(v:Float):Float { return values[AX] = v; }
    
    public var ay(get,set):Float;
    public function get_ay():Float { return values[AY]; }
    public function set_ay(v:Float):Float { return values[AY] = v; }
}
