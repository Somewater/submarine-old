function RemoveRoomUserCommand(roomId){
    Command.call(this, RemoveRoomUserCommand.ID);
    this.roomId = roomId
    this.data = true;
    this.execute = function(){
        var user = this.data.user;
        var users = Model.room.users;
        var deleted = false;
        for(var i in users){
            var user2 = users[i];
            if(user2.uid == user.uid){
                users.splice(i, 1);
                deleted = true;
                break;
            }
        }
        if(deleted){
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