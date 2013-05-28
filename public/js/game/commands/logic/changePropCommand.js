function ChangePropCommand(uid, propName, newValue){
    Command.call(this, ChangePropCommand.ID);
    this.toData = function(){
        return {uid: uid, pn: propName, val: newValue};
    }
}
ChangePropCommand.ID = 'changeprop'
Command.add(ChangePropCommand.ID, ChangePropCommand)

function ChangePropApplyCommand(){
    Command.call(this, ChangePropApplyCommand.ID);
    this.data = true
    this.execute = function(){
        var gameUser = Model.room.findUserById(this.data.uid)
        if(this.data.pn == 'health'){
            gameUser.addHealth(this.data.val - gameUser.health, true)
        }else if(this.data.pn == 'score'){
            gameUser.addScore(this.data.val - gameUser.score, true)
        }
    }
}
ChangePropApplyCommand.ID = 'changeprop-apply'
Command.add(ChangePropApplyCommand.ID, ChangePropApplyCommand)