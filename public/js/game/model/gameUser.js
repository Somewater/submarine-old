function GameUser(data){
    if(!data)
        data = {}
    this.uid = data.uid
    this.score = data.score || 0;
    this.health = data.health || 100;
    
    Bindable(this);
    
    this.addHealth = function(delta){
        this.health = Math.max(0, this.health + delta)
        this.dispatch('health')
    }
    this.addScore = function(delta){
        this.score += delta
        this.dispatch('score')
    }
}