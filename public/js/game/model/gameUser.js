function GameUser(uid){
    this.uid = uid
    this.score = 0;
    this.health = 100;
    this.room = null;
    
    Bindable(this);
    
    this.addHealth = function(delta, silentEvent){
        this.health = Math.max(0, this.health + delta)
        if(delta < 0)
            Engine.sound.play('growl');
        if(!silentEvent)
            this.dispatch('health', this)
    }
    this.addScore = function(delta, silentEvent){
        this.score += delta
        if(delta > 0)
            Engine.sound.play('collect');
        if(!silentEvent)
            this.dispatch('score', this)
    }
    this.isOwner = function(){
        return this.room && this.room.owner().uid == this.uid;
    }
    this.itsMe = function(){
        return Model.user.uid == this.uid
    }
    this.toData = function(){
        return {uid: this.uid, 
                health: this.health, 
                score: this.score}
    }
    this.fromData = function(data){
        this.score = data.score
        this.health = data.health
    }
}

GameUser.instancesByUid = {}
GameUser.instantiate = function(data){
    var uid = data.uid
    var user = GameUser.instancesByUid[uid]
    if(!user)
        GameUser.instancesByUid[uid] = user = new GameUser(uid)
    user.fromData(data)
    return user
}