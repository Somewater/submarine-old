function RemoveRoomUserCommand(roomId){
    Command.call(this, RemoveRoomUserCommand.ID);
    this.roomId = roomId
    this.data = true;
    this.execute = function(){
        var user = GameUser.instantiate(this.data.user);
        if(Model.room.containsUser(user)){
            user = Model.room.removeUser(user);
            Model.dispatch(Events.ROOM_USERS_CHANGE, user)
            Model.dispatch(Events.ROOM_USER_REMOVE, user)
            trace("User uid=" + user.uid + " removed from room #" + Model.room.roomId);
        }else{
            throw "User " + user.uid + " not found in room " + Model.room.roomId;
        }
    }
}
RemoveRoomUserCommand.ID = 'removeuser'
Command.add(RemoveRoomUserCommand.ID, RemoveRoomUserCommand)