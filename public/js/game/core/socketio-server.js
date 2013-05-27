function SocketIOServer(){
    this.serverManager = null;
    this.socket = null;
    this.initialize = function(serverManager){
        var self = this;
        this.serverManager = serverManager;
        this.socket = io.connect('http://localhost:4000');
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
                for(var f in data.data)
                    cmd[f] = data.data[f];
                self.serverManager.handle(cmd);
            }else
                trace("Undefined command id " + data.id + " received");
        });
    }
    this.send = function(command){
        var commandData = {id: command.id, data: command.toData()};
        this.socket.emit('cmd', commandData);
    }
}