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
            this.gotoPoint(Engine.clickPoint.x, Engine.clickPoint.y);
        else if(Engine.keydownX != 0 || Engine.keydownY != 0){
            var DIST = 100;
            this.gotoPoint(this.x + Engine.keydownX * DIST, this.y + Engine.keydownY * DIST);
        }else
            this.updateSpeed(0, 0);
        this.updatePosition();
    };
    this.gotoPoint = function(px, py){
        var accX = 0;
        var accY = 0.01;

        var pdx, pdy;
        var dx = pdx = px - this.x;
        var dy = pdy = py - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        dx = dx / dist;
        dy = dy / dist;
        accX += dx * this.acceleration;
        accY += dy * this.acceleration;

        this.updateSpeed(accX, accY);

        // anti "elastic"
        if(Math.abs(pdx - this.speedX) < this.speed){
            this.speedX *= Math.abs(pdx - this.speedX) / this.speed;
            if(Math.abs(this.speedX) < Const.coordTreshold)
                this.speedX = 0;
        }
        if(Math.abs(pdy - this.speedY) < this.speed){
            this.speedY *= Math.abs(pdy - this.speedY) / this.speed;
            if(Math.abs(this.speedY) < Const.coordTreshold)
                this.speedY = 0;
        }
    }
    this.updateSpeed = function(accX, accY){
        this.speedX = (this.speedX + accX) * Const.frictionCoef;
        this.speedY = (this.speedY + accY) * Const.frictionCoef;
        var sumSpeed = this.speedX * this.speedX + this.speedY * this.speedY;
        var speedRatio = this.speed / Math.sqrt(sumSpeed);
        if(speedRatio < 1){
            this.speedX *= speedRatio;
            this.speedY *= speedRatio;
        }
    };
}