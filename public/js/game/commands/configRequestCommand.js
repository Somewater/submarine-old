function ConfigRequestCommand(){
    Command.call(this, ConfigRequestCommand.ID);
    this.data = true;
    this.execute = function(){
        Model.config = this.data;
        Model.dispatch(Events.CONFIG_READY)
        trace("Model.config assigned");
    }
}
ConfigRequestCommand.ID = 'config'
Command.add(ConfigRequestCommand.ID, ConfigRequestCommand)