function AddRoomUserCommand(roomId){
    Command.call(this, AddRoomUserCommand.ID);
    this.roomId = roomId
    this.data = true;
    this.execute = function(){
        var user = new GameUser(this.data.user);
        if(!Model.room.containsUser(user)){
            Model.room.addUser(user);
            Model.dispatch(Events.ROOM_USERS_CHANGE, user)
            Model.dispatch(Events.ROOM_USER_ADD, user)
            trace("User uid=" + user.uid + " added to room #" + Model.room.roomId);
        }
    }
}
AddRoomUserCommand.ID = 'adduser'
Command.add(AddRoomUserCommand.ID, AddRoomUserCommand)