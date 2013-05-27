function RoomListRequestCommand(){
    Command.call(this, RoomListRequestCommand.ID);
    this.data = true;
    this.execute = function(){
        Model.roomList = this.data.rooms;
        Model.dispatch(Events.ROOM_LIST_READY)
        trace("Model.roomList assigned");
    }
}
RoomListRequestCommand.ID = 'rooms'
Command.add(RoomListRequestCommand.ID, RoomListRequestCommand)