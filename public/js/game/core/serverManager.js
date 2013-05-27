Engine.server = new function(){
    this.core = null;
    this.started = false;
    this.connected = false;
    this.commandQueue = [];
    
    this.initialize = function(core){
        if(!core)
            core = SocketIOServer;
        this.core = typeof core == 'function' ? new core() : core;
    }
    this.start = function(){
        if(!this.started){
            this.started = true;
            this.connected = false;
            this.core.initialize(this);
        }
    }
    
    this.onConnect = function(){
        trace('Client has connected to the server');
        var c = this.connected;
        this.connected = true;
        if(!c)
            this.sendCommandQueue();
                
    }
    
    this.onDisconnect = function(){
        trace('The client has disconnected!');
        this.connected = false;
    }
    
    this.send = function(command){        
        if(!this.started)
            this.start();

        if(this.connected)
            this.core.send(command);
        else
            this.commandQueue.push(command);
    }
    
    this.handle = function(command){
        command.execute();
    }
    
    this.sendCommandQueue = function(){
        var queue = this.commandQueue.slice();
        this.commandQueue = [];
        for (var i = 0; i < queue.length; i++)
            this.send(queue[i])
    }
}

function Command(id){
    this.id = id;
    this.send = function(){
        Engine.server.send(this);
    }
    this.execute = function(){}
    this.toData = function(){
        var data = JSON.parse(JSON.stringify(this));
        return data;
    }
}
Command.registegred = {}
Command.add = function(id, commandClazz){
    Command.registegred[id] = commandClazz;
}
Command.get = function(id){
    var clazz = Command.registegred[id];
    if(clazz){
        return clazz;
    }else{
        throw 'Command ' + id + ' not found'
    }
}

/*
    Core Transport
    function BaseCore(){
        this.serverManager = null;
        this.initialize = function(serverManager){}
        this.send = function(command){}
    }
*/