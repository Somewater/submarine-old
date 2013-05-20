/**
 * @depend engine.js
 */

function Shark(){
    SObject.apply(this);
    this.image = "shark.png";
    this.speed = 2.0;
    this.targetPoint = null;
    this.tick = function(){
        if(!this.targetPoint){
            this.targetPoint = new PIXI.Point(Engine.width * Math.random(), Engine.height * Math.random());
        }
        this.gotoCoords(this.targetPoint.x, this.targetPoint.y);
        this.updatePosition();

        if(Utils.distance(this.targetPoint, this.getPosition()) < this.speed)
            this.targetPoint = null;
    };
}
Targetable(Shark);