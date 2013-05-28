SObject.idCounter = 1;
function SObject() {
    this.id = (Model.isOwner() ? SObject.idCounter++ : undefined);
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
    this._rect = null;
    
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
        this._rect = null;
        this.view = view;
        this.view.position.x = this.x;
        this.view.position.y = this.y;
    }
    this.getView = function(){return this.view }
    
    this.getRect = function(){
        if(!this._rect){
            this._rect = new PIXI.Rectangle(this.x,
                                            this.y,
                                            this.view ? Math.abs(this.view.width) : 0,
                                            this.view ? Math.abs(this.view.height) : 0);
        }else{
            this._rect.x = this.x;
            this._rect.y = this.y;
            this._rect.width = this.view ? Math.abs(this.view.width) : 0; 
            this._rect.height = this.view ? Math.abs(this.view.height) : 0;
        }
        this._rect.x -= this._rect.width * 0.5;
        this._rect.y -= this._rect.height * 0.5;
        return this._rect;
    }
    this.toData = function(){
        return {id: this.id, x: this.x, y: this.y, sx: this.speedX, sy: this.speedY}
    }
    this.fromData = function(data){
        if(data.id != this.id){
            if(!this.id)
                this.id = data.id
            else
                throw "id not equals, this.id=" + this.id + ", data.id=" + data.id
        }
        this.x = data.x;
        this.y = data.y;
        this.speedX = data.sx;
        this.speedY = data.sy;
        if(!this.tick)
            this.updatePosition();
    }
}