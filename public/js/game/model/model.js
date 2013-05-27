Model = new (function(){
    this.config = null;
    this.user = null;
    this.roomList = null;
    this.room = null;
    
    Bindable(this);
    
    this.monsters = null;
    this.scoreItems = null;
    this.hero = null;
    this.heroes = null;
})()