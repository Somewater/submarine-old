package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.IEntity;
import com.hellespontus.engine.core.IWorld;
import com.hellespontus.engine.core.CommandBase;
class SelectTargetCommand extends CommandBase{

    public static inline var TYPE:Int = 1;    

    private var entityId:Int;
    private var targetX:Int;
    private var targetY:Int;

    public function new(entityId:Int, targetX:Int, targetY:Int) {
        this.entityId = entityId;
        this.targetX = targetX;
        this.targetY = targetY;
        super(TYPE);
    }

    override public function execute(world:IWorld):IWorld {
        var entity:Entity2D = cast(world.get(entityId), Entity2D);
        var velocity:Float = 1;
        var theta:Float = Math.atan2(targetX - entity.x, targetY - entity.y);
        entity.vx = Math.cos(theta) * velocity;
        entity.vy = Math.sin(theta) * velocity;
        return world;
    }
}
