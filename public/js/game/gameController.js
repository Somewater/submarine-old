GameController = new (function(){
    this.initialize = function(){
        var self = this;
        Model.on(Events.CONFIG_READY, function(){
            Engine.server.stop();
            Model.on(Events.USERDATA_READY, function(){
                trace('UserData ready');
                Engine.server.stop();
                self.startGame();
            })
            trace('request UserData');
            Engine.server.send(new UserDataRequestCommand());
        })
        Engine.server.send(new ConfigRequestCommand());
    };
    this.startGame = function(){
        var submarine = Model.hero = new Submarine();
        submarine.setX(renderer.width / 2);
        submarine.setY(renderer.height / 2);
        Engine.addSObject(submarine);

        for (var i = 0; i < 10; i++) {
            var shark = new Shark();
            shark.setX(Engine.width * Math.random());
            shark.setY(Engine.height * Math.random());
            Engine.addSObject(shark);
        }

        for (var i = 0; i < 30; i++) {
            var scoreItem = new ScoreItem();
            scoreItem.setX(Engine.width * Math.random());
            scoreItem.setY(Engine.height * Math.random());
            Engine.addSObject(scoreItem);
        }

        Engine.sound.play('sea_theme', -1);

        GuiController.start();
        Engine.ticker.add(this.tick, 20, this);
    }
    this.stopGame = function(){
        Engine.ticker.remove(this.tick);
        Engine.toggle(false);
    }
    this.tick = function(){
        Engine.tick();
        if(Model.hero.health <= 0){
            this.stopGame();
        }
    }
})()