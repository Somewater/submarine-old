function BlankCommand(){
    Command.call(this, BlankCommand.ID);
    this.execute = function(){
    }
}
BlankCommand.ID = 'blank'
Command.add(BlankCommand.ID, BlankCommand)