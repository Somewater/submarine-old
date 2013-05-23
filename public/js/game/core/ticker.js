Engine.ticker = new function(){
    this.tickers = [];// array of {callback, self, args, [interval], delay, waiting}
    
    this.lastTickTime = 0;
    
    this.initialize = function(){
    }
    this.tick = function(){
        var tickTime = new Date().getTime();
        var dt = this.lastTickTime ? tickTime - this.lastTickTime : 0;
        var tickersClone = this.tickers.slice();
        var l = tickersClone.length;
        for(var i  = 0; i < l; i++){
            var t = tickersClone[i];
            t.delay -= dt;
            t.waiting += dt
            if(t.delay <= 0){
                t.callback.call(t.self, t.args || [t.waiting]);
                if(t.interval){
                    t.delay = t.interval;
                    t.waiting = 0;
                }else{
                    var idx = this.tickers.indexOf(t);
                    if(idx > -1)
                        this.tickers.splice(idx, 1);
                }
            }
        }
        this.lastTickTime = tickTime;
    }
    this.add = function(callback, msInterval, self, args){
        this.tickers.push({callback: callback, interval: msInterval, delay: msInterval, self: self, args: args, waiting: 0});    
    }
    this.remove = function(callback){
        var l = this.tickers.length;
        for(var i = 0; i < l; i++){
            if(this.tickers[i].callback == callback){
                this.tickers.splice(i, 1);
                return true;
            }
        }   
        return false;
    }
    this.defer = function(callback, msDelay, self, args){
        this.tickers.push({callback: callback, delay: msDelay, self: self, args: args, waiting: 0});
    }
};