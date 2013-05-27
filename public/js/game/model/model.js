Model = new (function(){
    this.config = null;
    this.user = null;
    
    Bindable(this);
    
    this.sharks = []
    this.hero = null;
})()