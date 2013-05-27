GameController = new (function(){
    this.initialize = function(){
        var self = this;
        Model.onOnce(Events.CONFIG_READY, function(){
            Model.onOnce(Events.USERDATA_READY, function(){
                trace('UserData ready');
                Model.onOnce(Events.ROOM_LIST_READY, function(){
                    trace('Room list ready');
                    Model.onOnce(Events.ROOM_READY, function(){
                        trace('Room ready, game started!');
                        self.startGame();                        
                    })
                    Engine.server.send(new ConnectToRoomCommand(Model.roomList[0].roomId));
                });
                Engine.server.send(new RoomListRequestCommand());
            })
            trace('request UserData');
            Engine.server.send(new UserDataRequestCommand());
        })
        Engine.server.send(new ConfigRequestCommand());
    };
    this.startGame = function(){
        var submarine = new Submarine();
        submarine.setX(renderer.width / 2);
        submarine.setY(renderer.height / 2);
        Engine.addSObject(submarine);
        Model.hero = submarine
        Model.heroes = [submarine];

        Model.monsters = []
        for (var i = 0; i < 10; i++) {
            var shark = new Shark();
            shark.setX(Engine.width * Math.random());
            shark.setY(Engine.height * Math.random());
            Engine.addSObject(shark);
            Model.monsters.push(shark);
        }

        Model.scoreItems = []
        for (var i = 0; i < 30; i++) {
            var scoreItem = new ScoreItem();
            scoreItem.setX(Engine.width * Math.random());
            scoreItem.setY(Engine.height * Math.random());
            Engine.addSObject(scoreItem);
            Model.scoreItems.push(scoreItem);
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