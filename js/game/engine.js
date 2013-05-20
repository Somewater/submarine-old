/**
 * @depend game/const.js
 * @depend game/sobject.js
 * @depend game/targetable.js
 * @depend game/utils.js
 */

EngineClass = function(){
    this.sobjects = [];
    this.stage = new PIXI.Stage(0xF0F0FF, true);
    this.view = null;
    this.keydownX = 0;
    this.keydownY = 0;
    this.clickPoint = null;
    this.width = 0;
    this.height = 0;
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
        this.width = renderer.width;
        this.height = renderer.height;
        this.view = renderer.view;
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
    }
};
Engine = new EngineClass();