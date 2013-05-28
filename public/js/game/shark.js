/**
 * @depend engine.js
 */

function Shark(){
    SObject.apply(this);
    TargetPoint(this);
    this.image = "shark.png";
    this.speed = .5;
    this.tick = function(){
        if(!this.targetPoint && Model.isOwner()){
            this.targetPoint = new PIXI.Point(Engine.width * Math.random(), Engine.height * Math.random());
        }
        if(!this.targetPoint) return
        this.gotoCoords(this.targetPoint.x, this.targetPoint.y);
        this.updatePosition();

        if(Utils.distance(this.targetPoint, this.getPosition()) < Math.max(1,this.speed))
            this.targetPoint = null;
        else{
            var dx = this.targetPoint.x - this.x;
            if(dx != 0)
                this.flipView(dx < 0);
        }
    };
}
Targetable(Shark);