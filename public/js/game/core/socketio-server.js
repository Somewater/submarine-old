function SocketIOServer(){
    this.serverManager = null;
    this.socket = null;
    this.initialize = function(serverManager){
        this.serverManager = serverManager;
    }
    this.start = function(){
        var self = this;
        if(this.socket){
            if(this.socket.connected)
                this.stop();
            this.socket.socket.connect()
            return
        }
        this.socket = io.connect('http://' + window.location.hostname + ':4000');
        this.socket.on('connect', function() {
            self.serverManager.onConnect();
        });
        this.socket.on('disconnect', function() {
            self.serverManager.onDisconnect();
        });
        this.socket.on('cmd', function(data) {
            var cmdClass = Command.get(data.id);
            if(cmdClass){
                var cmd = new cmdClass();
                if(cmd.data)
                    cmd.data = data.data
                else
                    for(var f in data.data)
                        cmd[f] = data.data[f];
                self.serverManager.handle(cmd);
            }else
                trace("Undefined command id " + data.id + " received");
        });
    }
    this.stop = function(){
        if(this.socket){
            this.socket.socket.disconnect();
        }
    }
    this.send = function(command){
        var commandData = {id: command.id, data: command.toData()};
        this.socket.emit('cmd', commandData);
    }
}