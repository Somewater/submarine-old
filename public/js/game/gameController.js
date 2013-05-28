GameController = new (function(){
    this.tickMcAccum = 0
    this.needSync
    
    this.initialize = function(){
        var self = this;
        Model.onOnce(Events.CONFIG_READY, function(){
            Model.onOnce(Events.USERDATA_READY, function(){
                trace('UserData ready');
                Model.onOnce(Events.ROOM_LIST_READY, function(){
                    trace('Room list ready');
                    Model.onOnce(Events.ROOM_READY, function(){
                        trace('Room ready, game started!');
                        self.createInitialModel();
                        if(Model.isOwner()){
                            Model.on(Events.ROOM_USER_ADD, self.onUserAdded, self)
                            Model.on(Events.ROOM_USER_REMOVE, self.onUserRemoved, self)
                            self.createInitialCreatures();
                        }
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
    this.createInitialModel = function(){
        Model.heroes = []
        Model.monsters = []
        Model.scoreItems = []
    }
    this.createInitialCreatures = function(){
        var submarine = new Submarine(Model.user);
        submarine.setX(renderer.width / 2);
        submarine.setY(renderer.height / 2);
        Engine.addSObject(submarine);
        Model.hero = submarine
        Model.heroes.push(submarine);

        for (var i = 0; i < 10; i++) {
            var shark = new Shark();
            shark.setX(Engine.width * Math.random());
            shark.setY(Engine.height * Math.random());
            Engine.addSObject(shark);
            Model.monsters.push(shark);
        }

        for (var i = 0; i < 30; i++) {
            var scoreItem = new ScoreItem();
            scoreItem.setX(Engine.width * Math.random());
            scoreItem.setY(Engine.height * Math.random());
            Engine.addSObject(scoreItem);
            Model.scoreItems.push(scoreItem);
        }
    }
    this.startGame = function(){
        Engine.sound.play('sea_theme', -1);

        GuiController.start();
        Engine.ticker.add(this.tick, 20, this);
    }
    this.stopGame = function(){
        Engine.ticker.remove(this.tick);
        Engine.toggle(false);
    }
    this.tick = function(dt){
        if(Model.room.users.length < 2)
            return
        Engine.tick();
        if(Model.isOwner()){
            if(Model.hero.health <= 0){
                this.stopGame();
                this.needSync = true
            }
            this.tickMcAccum += dt
            if(this.needSync || this.tickMcAccum > 1000){
                this.tickMcAccum = 0;
                this.needSync = false
                Engine.server.send(new SyncAllCommand());
            }
        }
    }
    this.onUserAdded = function(gameUser){
        var submarine = new Submarine(gameUser);
        var degreeIndex = Model.heroes.length / 5 * Math.PI * 2;
        submarine.setX(renderer.width / 2 + 100 * Math.sin(degreeIndex));
        submarine.setY(renderer.height / 2 + 100 * Math.cos(degreeIndex));
        Engine.addSObject(submarine);
        Model.heroes.push(submarine);
        gameUser.on('score', this.onGameUserScoreChanged, this)
        gameUser.on('health', this.onGameUserHealthChanged, this)
        this.needSync = true
    }
    this.onUserRemoved = function(gameUser){
        var submarine = null;
        for(var i in Model.heroes)
            if(Model.heroes[i].gameUser.uid == gameUser.uid){
                submarine = Model.heroes[i];
                Model.heroes.splice(i, 1);
                break;
            }
        Engine.removeSObject(submarine)
        gameUser.unbind('score', this.onGameUserScoreChanged)
        gameUser.unbind('health', this.onGameUserHealthChanged)
        
        this.needSync = true
    }
    this.onGameUserScoreChanged = function(gameUser){
        Engine.server.send(new ChangePropCommand(gameUser.uid, 'score', gameUser.score))
    }
    this.onGameUserHealthChanged = function(gameUser){
        Engine.server.send(new ChangePropCommand(gameUser.uid, 'health', gameUser.health))
    }
})()