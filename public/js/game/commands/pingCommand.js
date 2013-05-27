function PingCommand(){
    Command.call(this, PingCommand.ID);
    this.execute = function(){
        trace("< PING");
        PingCommand.lastInvoking = new Date().valueOf();
        this.send();
    }
}
PingCommand.ID = 'ping'
PingCommand.lastInvoking = 0;
Command.add(PingCommand.ID, PingCommand)