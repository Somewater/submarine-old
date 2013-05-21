// при выходе за границы карты, объект "отталкивается" от стен

function Boundable(instanse){
    instanse.bound = -50;// inner bounds if positive
    instanse.boundFrictionCoeff = 0.9;
    var superUpdatePosition = instanse.updatePosition
    instanse.updatePosition = function(){
        var rect = this.getRect();
        var newX = rect.x + this.speedX;
        var newY = rect.y + this.speedY;
        if((newX < this.bound) || (newX + rect.width > Engine.width - this.bound))
            this.speedX = -this.speedX * this.boundFrictionCoeff;
        if((newY < this.bound) || (newY + rect.height > Engine.height - this.bound))
            this.speedY = -this.speedY * this.boundFrictionCoeff;
        superUpdatePosition.call(this)    
    }
}