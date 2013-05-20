/**
 * @depend engine.js
 */

function Submarine(){
    SObject.apply(this);
    this.image = "submarine.png";
    this.speed = 15.0;
    this.acceleration = 1.0;
    this.tick = function(){
        if(Engine.input.clickPoint)
            this.gotoCoords(Engine.input.clickPoint.x, Engine.input.clickPoint.y);
        else if(Engine.input.keydownX != 0 || Engine.input.keydownY != 0){
            var DIST = 100;
            this.gotoCoords(this.x + Engine.input.keydownX * DIST, this.y + Engine.input.keydownY * DIST);
        }else
            this.updateSpeed(0, 0);
        this.updatePosition();
    };
    Submarine.instance = this;
}

Targetable(Submarine);