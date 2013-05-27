function DisconnectFromRoomCommand(){
    Command.call(this, DisconnectFromRoomCommand.ID);
    this.data = true;
    this.execute = function(){
        Model.room = null;
        Model.dispatch(Events.ROOM_DISCONNECT)
        trace("Room disconnect");
    }
}
DisconnectFromRoomCommand.ID = 'roomdisconn'
Command.add(DisconnectFromRoomCommand.ID, DisconnectFromRoomCommand)