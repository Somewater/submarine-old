function ConnectToRoomCommand(roomId){
    Command.call(this, ConnectToRoomCommand.ID);
    this.roomId = roomId
    this.data = true;
    this.execute = function(){
        Model.room = this.data.room;
        Model.dispatch(Events.ROOM_READY)
        Model.dispatch(Events.ROOM_USERS_CHANGE)
        trace("Room ready");
    }
}
ConnectToRoomCommand.ID = 'roomconn'
Command.add(ConnectToRoomCommand.ID, ConnectToRoomCommand)