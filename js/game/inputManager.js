Engine.input = new function(){
    this.keydownX = 0;
    this.keydownY = 0;
    this.clickPoint = null;

    this.initialize = function(){
        var self = this;
        $(document).keydown(function(event){
            if(self.onKeyChange(event.keyCode, true))
                event.preventDefault();
        });
        $(document).keyup(function(event){
            if(self.onKeyChange(event.keyCode, false))
                event.preventDefault();
        });
        var clickDownFunc = function(event){
            event.preventDefault();
            self.clickPoint = Utils.getPosition(event.originalEvent ? event.originalEvent : event);
        }
        var clickUpFunc = function(event){
            event.preventDefault();
            self.clickPoint = null;
        }
        $(renderer.view).on(Modernizr.touch ? "touchstart" : "mousedown", clickDownFunc);
        $(renderer.view).on(Modernizr.touch ? "touchend" : "mouseup", clickUpFunc);
    };
    this.onKeyChange = function(keyCode, down){
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
        return changed;
    }
};