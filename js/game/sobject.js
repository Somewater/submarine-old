function SObject() {
    this.image = null;
    this.view = null;
    this.onAdded = null;
    this.onRemoved = null;
    this.tick = null;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speed = 0;
    this.acceleration = 0.5;
    this.getX = function(){ return this.x; }
    this.getY = function(){ return this.y; }
    this.getPosition = function(){ return new PIXI.Point(this.x, this.y); }
    this.setX = function(x){
        if(this.view) this.view.position.x = x;
        this.x = x
    };
    this.setY = function(y){
        if(this.view) this.view.position.y = y;
        this.y = y
    };
    this.updatePosition = function(){
        this.setX(this.getX() + this.speedX);
        this.setY(this.getY() + this.speedY);
    };
    this.setView = function(view){
        this.view = view;
        this.view.position.x = this.x;
        this.view.position.y = this.y;
    }
    this.getView = function(){return this.view; }
}