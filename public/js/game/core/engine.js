/**
 * @depend game/core/const.js
 * @depend game/core/sobject.js
 * @depend game/core/targetable.js
 * @depend game/core/boundable.js
 * @depend game/core/utils.js
 */

EngineClass = function(){
    this.sobjects = [];
    this.stage = new PIXI.Stage(0xF0F0FF, true);
    this.view = null;
    this.width = 0;
    this.height = 0;
    this.input = null;//  InputManager
    this.sound = null;// SoundManager
    this.ticker = null;// Ticker
    this.running = true;
    // functions
    this.tick = function(){
        if(!this.running) return;
        var sobjectsClone = this.sobjects.slice();
        for (var i = 0; i < sobjectsClone.length; i++) {
            var sobj = sobjectsClone[i];
            if(sobj.tick)
                sobj.tick();
        }
        this.ticker.tick();
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
        this.input.initialize();
        this.sound.initialize();
        this.ticker.initialize();
    }
    this.heroPosition = function(){
        if(Submarine.instance)
            return Submarine.instance.getPosition();
        throw new Error("Hero not instatiated");
    }
    this.intersectSObjects = function(sobject){
        var result = [];
        var sobjectRect = sobject.getRect();
        var l = this.sobjects.length;
        for(var i = 0; i < l; i++){
            var so = this.sobjects[i];
            if(so != sobject && Utils.intersectsRect(sobjectRect, so.getRect()))
                result.push(so);
        }
        return result;
    }
    this.toggle = function(on){
        if(on === undefined) on = true;
        this.running = on;
    }
};
Engine = new EngineClass();

/**
 * @depend game/core/inputManager.js
 * @depend game/core/soundManager.js
 * @depend game/core/ticker.js
 */