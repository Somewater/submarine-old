GuiController = new (function(){
    this.healthTablo = null;
    this.scoreTablo = null;
    
    this.initialize = function(){
        var healthTablo = new PIXI.Text("", {font:"12px Arial", fill:"green"});
        healthTablo.position.x = Engine.width - 100;
        healthTablo.position.y = 5;
        Engine.stage.addChild(healthTablo);
        this.healthTablo = healthTablo;

        var scoreTablo = new PIXI.Text("", {font:"12px Arial", fill:"blue"});
        scoreTablo.position.x = Engine.width - 100;
        scoreTablo.position.y = 25;
        Engine.stage.addChild(scoreTablo);
        this.scoreTablo = scoreTablo;
    }
    this.start = function(){
        Engine.ticker.add(this.tick, 400, this);
    }
    this.stop = function(){
        
    }
    this.tick = function(){
        if(Model.hero.health <= 0)
            this.healthTablo.setText('Submarine dead');
        else{
            this.healthTablo.setText('health\t' + Math.round(Model.hero.health) + '%');
            if(Model.hero.health < 40)
                this.healthTablo.setStyle({font: "12px Arial", fill: 'red'})
        }
        this.scoreTablo.setText('score\t' + Utils.digitize(Model.hero.score, 4));
    }
})()