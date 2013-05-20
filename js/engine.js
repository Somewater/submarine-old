Const = new (function(){
    this.basePath = "/"; // "http://example.com"
    this.imagePath = this.basePath + "img/";
    this.coordTreshold = 0.1;
    this.frictionCoef = 0.9;
});
EngineClass = function(){
    this.sobjects = [];
    this.stage = new PIXI.Stage(0xF0F0FF, true);
    this.keydownX = 0;
    this.keydownY = 0;
    this.clickPoint = null;
    // functions
    this.tick = function(){
        var sobjectsClone = this.sobjects.slice();
        for (var i = 0; i < sobjectsClone.length; i++) {
            var sobj = sobjectsClone[i];
            if(sobj.tick)
                sobj.tick();
        }
    };
    this.addSObject = function(sobj){
        var texture = new PIXI.Texture.fromImage(Const.imagePath + sobj.image);
        sobj.setView(new PIXI.Sprite(texture));
        sobj.getView().anchor.x = sobj.getView().anchor.y = 0.5;
        this.sobjects.push(sobj);
        this.stage.addChild(sobj.getView());
        if(sobj.onAdded)
            sobj.onAdded();
    };
    this.removeSObject = function(sobj){
        this.stage.removeChild(sobj.getView());
        this.sobjects.splice(this.sobjects.indexOf(sobj), 1);
        if(sobj.onRemoved)
            sobj.onRemoved();
    };
    this.initialize = function(renderer){
        var self = this;
        var keyChangeFunc = function(keyCode, down){
            var changed = false;
            var dx = 0;
            var dy = 0;
            if(keyCode == 37 || keyCode == 65){// LEFT (A)
                dx = -1;
                changed = true;
            }else if(keyCode == 38 || keyCode == 87){// UP (W)
                dy = -1;
                changed = true;
            }else if(keyCode == 39 || keyCode == 68){// RIGHT (D)
                dx = 1;
                changed = true;
            }else if(keyCode == 40 || keyCode == 83){// DOWN (S)
                dy = 1;
                changed = true;
            }
            if(dx){
                if(down)
                    self.keydownX = dx;
                else if(self.keydownX == dx)
                    self.keydownX = 0;
            }
            if(dy){
                if(down)
                    self.keydownY = dy;
                else if(self.keydownY == dy)
                    self.keydownY = 0;
            }
            return changed;
        }
        $(document).keydown(function(event){
            if(keyChangeFunc(event.keyCode, true))
                event.preventDefault();
        });
        $(document).keyup(function(event){
            if(keyChangeFunc(event.keyCode, false))
                event.preventDefault();
        });
        var clickDownFunc = function(data){
            self.clickPoint = self.stage.getMousePosition();
        }
        var clickUpFunc = function(data){
            self.clickPoint = null;
        }
        $(renderer.view).mousedown(clickDownFunc);
        document.addEventListener("touchstart", clickDownFunc, true);
        renderer.view.touchstart = clickDownFunc;
        $(renderer.view).mouseup(clickUpFunc);
        document.addEventListener("touchend", clickUpFunc, true);
        renderer.view.touchend = clickUpFunc;
    }
};
Engine = new EngineClass();

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
    this.getX = function(){ return this.x; }
    this.getY = function(){ return this.y; }
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