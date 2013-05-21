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
    this.width = 0;
    this.height = 0;
    this.input = null;//  InputManager
    this.sound = null;// SoundManager
    this.ticker = null;// Ticker
    // functions
    this.tick = function(){
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
};
Engine = new EngineClass();

/**
 * @depend game/inputManager.js
 * @depend game/soundManager.js
 * @depend game/ticker.js
 */