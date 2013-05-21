/**
 * @depend engine.js
 */

function Submarine(){
    SObject.apply(this);
    this.image = "submarine.png";
    this.speed = 15.0;
    this.acceleration = 1.0;
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
        Engine.ticker.add(this.checkCollision, 300, this);
    }
    this.onRemoved = function(){
        Engine.ticker.remove(this.checkCollision);
    }
    this.checkCollision = function(dt){
        console.log("COLLISION CHECK dt=" + dt)
    }
}

Targetable(Submarine);