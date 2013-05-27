/**
 * @depend engine.js
 */

function Submarine(){
    SObject.apply(this);
    Boundable(this)
    this.image = "submarine.png";
    this.speed = 15.0;
    this.acceleration = 1.0;
    this.health = 100;
    this.score = 0;
    this.attacking = [];// кто атаковал в прошлом тике (и 2+ тика подряд не учитывается)
    
    this.tick = function(){
        var px = NaN, py = NaN;
        if(Engine.input.clickPoint){
            px = Engine.input.clickPoint.x;
            py = Engine.input.clickPoint.y;
            this.gotoCoords(px, py);
        }else if(Engine.input.keydownX != 0 || Engine.input.keydownY != 0){
            var DIST = 100;
            px = this.x + Engine.input.keydownX * DIST;
            py = this.y + Engine.input.keydownY * DIST;
            this.gotoCoords(px, py);
        }else
            this.updateSpeed(0, 0);
        this.updatePosition();

        if(!isNaN(px) && Math.abs(px - this.x) > 2) {
            this.flipView(px < this.x);
        }
    };
    Submarine.instance = this;
    this.onAdded = function(){
        Engine.ticker.add(this.checkCollision, 50, this);
    }
    this.onRemoved = function(){
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
                Engine.removeSObject(obj);
            }
        }
        this.attacking.push(attackingNow);
        if(this.attacking.length > Const.attackTicks) this.attacking.shift();
    }
    this.changeHealth = function(delta){
        this.health += delta;
        if(delta < 0){
            Engine.sound.play('growl');
        }
    }
    this.changeScore = function(delta){
        this.score += delta;
        if(delta > 0)
            Engine.sound.play('collect');
    }
    this.isAttacking = function(sobjId){
        for (var i = 0; i < this.attacking.length; i++)
            if(this.attacking[i].indexOf(sobjId) != -1)
                return true;
        return false;
    }
}

Targetable(Submarine);