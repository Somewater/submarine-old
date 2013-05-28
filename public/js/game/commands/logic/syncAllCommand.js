function SyncAllCommand(){
    Command.call(this, SyncAllCommand.ID);
    this.execute = function(){
    }
    this.toData = function(){
        var monsters = [];
        var heroes = []
        var scoreItems = []
        var i;
        for(i in Model.monsters)
            monsters.push(Model.monsters[i].toData())
        for(i in Model.heroes)
            heroes.push(Model.heroes[i].toData())
        for(i in Model.scoreItems)
            scoreItems.push(Model.scoreItems[i].toData())
        return {monsters: monsters, heroes: heroes, scoreItems: scoreItems};
    }
}
SyncAllCommand.ID = 'syncall'
Command.add(SyncAllCommand.ID, SyncAllCommand)


function SyncAllApplyCommand(){
    this.data = true;
    Command.call(this, SyncAllApplyCommand.ID);
    this.execute = function(){
        var self = this;
        
        // MONSTERS
        this.process(this.data.monsters, Model.monsters, function(data){
            // create monster
            var sobject = new Shark()
            sobject.fromData(data)
            return sobject
        })
        // HEROES
        this.process(this.data.heroes, Model.heroes, function(data){
            // create hero
            var sobject = new Submarine(null)
            sobject.fromData(data)
            if(sobject.gameUser.itsMe())
                Model.hero = sobject
            return sobject
        })
        // SCORE ITEMS
        this.process(this.data.scoreItems, Model.scoreItems, function(data){
            // create scoreItem
            var sobject = new ScoreItem()
            sobject.fromData(data)
            return sobject
        })
    }
    this.arrayToHashById = function(array){
        var hash = {}
        for(var i in array){
            var obj = array[i]
            hash[obj.id] = obj
        }
        return hash
    }
    this.process = function(fromServerArray, modelArray, createCallback, removeCallback){
        var modelHash = this.arrayToHashById(modelArray);
        var forRemove = []
        var forCreate = []
        var i;
        for(i in fromServerArray){
            var data = fromServerArray[i];
            if(modelHash[data.id]){
                modelHash[data.id].fromData(data);
                delete modelHash[data.id]
            }else{
                forCreate.push(data);
            }
        }
        for(i in modelHash)
            if(modelHash[i])
                forRemove.push(modelHash[i])
        for(i in forRemove){
            var sobject = forRemove[i]
            Engine.removeSObject(sobject);
            Utils.remove(modelArray, sobject)
            if(removeCallback)
                removeCallback(sobject);
        }
        for(i in forCreate){
            var data = forCreate[i]
            var sobject = createCallback(forCreate[i])
            modelArray.push(sobject)
            Engine.addSObject(sobject)
        }
    }
}
SyncAllApplyCommand.ID = 'syncall-apply'
Command.add(SyncAllApplyCommand.ID, SyncAllApplyCommand)