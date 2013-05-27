function PongCommand(){
    Command.call(this, PongCommand.ID);
    this.execute = function(){
        var diff = new Date().valueOf() - PingCommand.lastInvoking;
        trace("> PONG " + diff + "ms");
    }
}
PongCommand.ID = 'pong'
Command.add(PongCommand.ID, PongCommand)