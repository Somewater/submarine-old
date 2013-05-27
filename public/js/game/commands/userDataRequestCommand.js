function UserDataRequestCommand(){
    Command.call(this, UserDataRequestCommand.ID);
    this.data = true;
    this.execute = function(){
        Model.user = this.data;
        Model.dispatch(Events.USERDATA_READY)
        trace("Model.user assigned");
    }
}
UserDataRequestCommand.ID = 'userdata'
Command.add(UserDataRequestCommand.ID, UserDataRequestCommand)