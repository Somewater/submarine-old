/**
 * @depend engine.js
 */

function Submarine(gameUser){
    SObject.apply(this);
    Boundable(this)
    TargetPoint(this);
    GameUserAssoc(this);
    SmoothMover(this);
    this.image = function(){ return this.gameUser && this.gameUser.itsMe() ? "submarine-my.png" : "submarine.png" };
    this.speed = 15.0;
    this.acceleration = 1.0;
    this.attacking = [];// кто атаковал в прошлом тике (и 2+ тика подряд не учитывается)
    this.gameUser = gameUser
    
    this.tick = function(){
        var px = NaN, py = NaN;
        if(this.gameUser.itsMe()){
            if(Engine.input.clickPoint && !Utils.pointsEquals(Engine.input.clickPoint, this.targetPoint)){
                this.targetPoint = Engine.input.clickPoint;
                if(!Model.isOwner())
                    Engine.server.send(new MoveCommand(this))
            }
        }
        if(this.targetPoint){
            px = this.targetPoint.x;
            py = this.targetPoint.y;
            this.gotoCoords(px, py);
        }/*else if(Engine.input.keydownX != 0 || Engine.input.keydownY != 0){
            var DIST = 100;
            px = this.x + Engine.input.keydownX * DIST;
            py = this.y + Engine.input.keydownY * DIST;
            this.gotoCoords(px, py);
        }*/else
            this.updateSpeed(0, 0);
        this.updatePosition();

        if(!isNaN(px) && Math.abs(px - this.x) > 2) {
            this.flipView(px < this.x);
        }
    };
    Submarine.instance = this;
    this.onAdded = function(){
        if(Model.isOwner())
            Engine.ticker.add(this.checkCollision, 50, this);
    }
    this.onRemoved = function(){
        if(Model.isOwner())
            Engine.ticker.remove(this.checkCollision);
    }
    this.checkCollision = function(dt){
        var inters = Engine.intersectSObjects(this);
        var attackingNow = [];
        for (var i = 0; i < inters.length; i++) {
            var obj = inters[i];
            if(obj instanceof Shark){
                if(!this.isAttacking(obj.id)){
                    this.changeHealth(-5);
                    attackingNow.push(obj.id)
                }
            }else if(obj instanceof ScoreItem) {
                this.changeScore(1);
                Utils.remove(Model.scoreItems, obj)
                Engine.removeSObject(obj);
            }
        }
        this.attacking.push(attackingNow);
        if(this.attacking.length > Const.attackTicks) this.attacking.shift();
    }
    this.changeHealth = function(delta){
        this.gameUser.addHealth(delta);
    }
    this.changeScore = function(delta){
        this.gameUser.addScore(delta);
    }
    this.isAttacking = function(sobjId){
        for (var i = 0; i < this.attacking.length; i++)
            if(this.attacking[i].indexOf(sobjId) != -1)
                return true;
        return false;
    }
}

Targetable(Submarine);