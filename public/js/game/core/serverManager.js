Engine.server = new function(){
    this.core = null;
    this.coreInited = false;
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
            if(!this.coreInited)
                this.core.initialize(this);
            this.core.start();
        }
    }
    this.stop = function(){
        if(this.started){
            this.started = false;
            this.connected = false;
            this.core.stop()
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
        else{
            this.commandQueue.push(command);
            if(!this.started){// мог стартовать ранее
                this.stop();
                this.start();
            }
        }
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
        var excludedFields = Command.EXCLUDED_FIELDS;
        for (var i = 0; i < excludedFields.length; i++)
            delete data[excludedFields[i]]
        return data;
    }
}
Command.registegred = {}
Command.EXCLUDED_FIELDS = ['data', 'id']
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
