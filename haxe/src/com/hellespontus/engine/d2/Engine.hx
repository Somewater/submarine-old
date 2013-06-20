package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.EngineBase;

class Engine extends EngineBase{
    public function new() {
        super();
    }

    override private function createEntityInstance():Entity2D {
        return new Entity2D();
    }
}
