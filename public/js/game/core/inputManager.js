Engine.input = new function(){
    this.keydownX = 0;
    this.keydownY = 0;
    this.clickPoint = null;

    this.startMovingHeroPos = null;
    this.startMovingPoint = null;
    this.moving = false;
    this.gestureActive = false;
    this.listenedKeys = {};

    this.initialize = function(){
        var self = this;
        $(document).keydown(function(event){
            var listened = self.listenedKeys[event.keyCode];
            if(listened)
                for (var i = 0; i < listened.length; i++)
                    listened[i]();
            if(self.onKeyChange(event.keyCode, true))
                event.preventDefault();
        });
        $(document).keyup(function(event){
            if(self.onKeyChange(event.keyCode, false))
                event.preventDefault();
        });
        var clickDownFunc = function(event){
            self.moving = true;
            self.gestureActive = false;
            event.preventDefault();
            self.clickPoint = Utils.getPosition(event);
            self.startMovingHeroPos = Engine.heroPosition();
            self.startMovingPoint = Utils.getPosition(event);
        }
        var clickUpFunc = function(event){
            event.preventDefault();
            self.clickPoint = null;
            self.startMovingPoint = null;
            self.moving = false;
        }
        var moveFunc = function(event){
            if(self.moving){
                var pos = Utils.getPosition(event);
                var dx = pos.x - self.startMovingPoint.x;
                var dy = pos.y - self.startMovingPoint.y;
                if(self.gestureActive || (dx * dx + dy * dy) > Const.gestureZoneSqr){
                    var heroPos = Engine.heroPosition();
                    self.clickPoint.x = heroPos.x + dx;
                    self.clickPoint.y = heroPos.y + dy;
                    self.gestureActive = true;
                }
            }
        }
        $(renderer.view).on(Modernizr.touch ? "touchstart" : "mousedown", clickDownFunc);
        $(renderer.view).on(Modernizr.touch ? "touchend" : "mouseup", clickUpFunc);
        $(renderer.view).on(Modernizr.touch ? "touchmove " : "mousemove", moveFunc);
    };
    this.bind = function(keyCode, callback){
        if(!this.listenedKeys[keyCode])
            this.listenedKeys[keyCode] = []
        this.listenedKeys[keyCode].push(callback);
    }
    this.unbind = function(keyCode, callback){
        if(this.listenedKeys[keyCode]){
            var idx = this.listenedKeys[keyCode].indexOf(callback);
            if(idx != -1){
                this.listenedKeys[keyCode].splice(idx, 1);
                if(this.listenedKeys[keyCode].length == 0)
                    delete this.listenedKeys[keyCode];
            }
        }
    }
    this.onKeyChange = function(keyCode, down){
        var preventDefault = false;
        var dx = 0;
        var dy = 0;
        if(keyCode == 37 || keyCode == 65){// LEFT (A)
            dx = -1;
            preventDefault = keyCode == 37;
        }else if(keyCode == 38 || keyCode == 87){// UP (W)
            dy = -1;
            preventDefault = keyCode == 38;
        }else if(keyCode == 39 || keyCode == 68){// RIGHT (D)
            dx = 1;
            preventDefault = keyCode == 39;
        }else if(keyCode == 40 || keyCode == 83){// DOWN (S)
            dy = 1;
            preventDefault = keyCode == 40;
        }
        if(dx){
            if(down)
                this.keydownX = dx;
            else if(this.keydownX == dx)
                this.keydownX = 0;
        }
        if(dy){
            if(down)
                this.keydownY = dy;
            else if(this.keydownY == dy)
                this.keydownY = 0;
        }
        return preventDefault;
    }
};