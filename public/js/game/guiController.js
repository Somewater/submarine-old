GuiController = new (function(){
    this.healthTablo = null;
    this.scoreTablo = null;
    this.usersTablo = null;
    
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

        this.usersTablo = new PIXI.Text("", {font:"12px monospace", fill:"black"});
        this.usersTablo.position.x = 5;
        this.usersTablo.position.y = 5;
        Engine.stage.addChild(this.usersTablo);
    }
    this.start = function(){
        Engine.ticker.add(this.tick, 400, this);
    }
    this.stop = function(){
        
    }
    this.tick = function(){
        if(Model.user.health <= 0)
            this.healthTablo.setText('Submarine dead');
        else{
            this.healthTablo.setText('health\t' + Math.round(Model.user.health) + '%');
            if(Model.user.health < 40)
                this.healthTablo.setStyle({font: "12px Arial", fill: 'red'})
        }
        this.scoreTablo.setText('score\t' + Utils.digitize(Model.user.score, 4));

        var usersText = sprintf('%-5s %-5s %-5s %-5s', 'uid', 'me', 'score', 'health')
        if(Model.room)
            for(var i in Model.room.users){
                var user = Model.room.users[i];
                var line = sprintf('%-5s %-5s %-5s %-5s', 
                    user.uid, (user.itsMe() ? '*' : '-') + (user.isOwner() ? '(W)' : ''), user.score, user.health) 
                usersText += "\n" + line;
            }
        this.usersTablo.setText(usersText);
    }
})()