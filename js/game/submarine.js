/**
 * @depend engine.js
 */

function Submarine(){
    SObject.apply(this);
    this.image = "submarine.png";
    this.speed = 15.0;
    this.acceleration = 1.0;
    this.health = 100;
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
        Engine.ticker.add(this.checkCollision, 100, this);
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
                    this.changeHealth(-1);
                    attackingNow.push(obj.id)
                }
            }
        }
        this.attacking.push(attackingNow);
        if(this.attacking.length > Const.attackTicks) this.attacking.shift();
    }
    this.changeHealth = function(delta){
        this.health += delta;
        trace('Health = ' + this.health);
        if(delta < 0){
            Engine.sound.play('hit');
        }
        if(this.health <= 0){
            Engine.toggle(false);
            trace('Submarine is dead');
        }
    }
    this.isAttacking = function(sobjId){
        for (var i = 0; i < this.attacking.length; i++)
            if(this.attacking[i].indexOf(sobjId) != -1)
                return true;
        return false;
    }
}

Targetable(Submarine);