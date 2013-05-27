function AddRoomUserCommand(roomId){
    Command.call(this, AddRoomUserCommand.ID);
    this.roomId = roomId
    this.data = true;
    this.execute = function(){
        var user = this.data.user;
        var users = Model.room.users;
        var alreadyAdded = false;
        for(var i in users)
            if(users[i].uid == user.uid){
                alreadyAdded = true;
                break;
            }
        if(!alreadyAdded){
            Model.room.users.push(user);
            Model.dispatch(Events.ROOM_USERS_CHANGE, user)
            Model.dispatch(Events.ROOM_USER_ADD, user)
            trace("User uid=" + user.uid + " added to room #" + Model.room.roomId);
        }
    }
}
AddRoomUserCommand.ID = 'adduser'
Command.add(AddRoomUserCommand.ID, AddRoomUserCommand)