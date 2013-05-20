/**
 * @depend engine.js
 */

function Submarine(){
    SObject.apply(this);
    this.image = "submarine.png";
    this.speed = 15.0;
    this.acceleration = 1.0;
    this.tick = function(){
        if(Engine.clickPoint)
            this.gotoCoords(Engine.clickPoint.x, Engine.clickPoint.y);
        else if(Engine.keydownX != 0 || Engine.keydownY != 0){
            var DIST = 100;
            this.gotoCoords(this.x + Engine.keydownX * DIST, this.y + Engine.keydownY * DIST);
        }else
            this.updateSpeed(0, 0);
        this.updatePosition();
    };
}

Targetable(Submarine);