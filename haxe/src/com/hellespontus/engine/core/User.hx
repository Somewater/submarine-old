package com.hellespontus.engine.core;
class User implements IUser{
    public var id:Int;
    public var lerp:Int;
    public var latency:Int;
    public var host:Bool;

    public function new() {
        id = 0;
        lerp = 100;
        latency = 100;
        host = false;
    }
}
