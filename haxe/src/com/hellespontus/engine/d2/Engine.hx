package com.hellespontus.engine.d2;
import com.hellespontus.engine.core.EngineBase;
import haxe.ds.IntMap;
import com.hellespontus.engine.core.User;
import com.hellespontus.engine.core.IUser;
import com.hellespontus.engine.core.IWorld;
import com.hellespontus.engine.core.IEntity;
import com.hellespontus.engine.core.IEngine;

class EngineImpl extends EngineBase{

    private static inline var MAX_USER_COUNT:Int = 100;

    private var entityIdCounter:Int;
    private var userIdCounter:Int;
    private var worlds:Array<IWorld>;

    public function new() {
        super();
        entityIdCounter = 1;
        userIdCounter = 1;
    }

    public function createEntity(?id:Int = -1, ?user:IUser = null):IEntity {
        var e:Entity2D = createEntityInstance();
        e.id = if(id == -1) generateEntityId(user) else id;
        e.user = user;
        return e;
    }

    private function createEntityInstance():Entity2D {
        return new Entity2D();
    }

    public function createUser(?id:Int = -1):IUser {
        var u:User = new User();
        u.id = if(id == -1) generateUserId() else id;
        return u;
    }

    private function generateEntityId(?user:IUser = null):Int {
        return (entityIdCounter++) * MAX_USER_COUNT + (if(user != null) user.id else 0);
    }

    private function generateUserId():Int {
        return userIdCounter++ % MAX_USER_COUNT;
    }

    public function world():IWorld {
        return worlds[worlds.length];
    }
}

class Engine extends EngineImpl implements IEngine{
}
