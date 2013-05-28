function Room(data){
    if(!data)
        data = {}
    this.roomId = data.roomId
    this.users = null;
    this.setUsers = function(usersData){
        this.users = []
        var user = Model.user;
        for(var i in usersData){
            var userData = usersData[i];
            user = GameUser.instantiate(userData)
            user.room = this;
            this.users.push(user);
        }
    }
    this.setUsers(data.users || []);
    this.addUser = function(gameUser){
        this.users.push(gameUser);
        gameUser.room = this;
    }
    this.removeUser = function(gameUser){
        var users = this.users;
        var deleted = false;
        for(var i in users){
            var user2 = users[i];
            if(user2.uid == gameUser.uid){
                users.splice(i, 1);
                user2.room = null;
                deleted = user2;
                break;
            }
        }
        return deleted
    }
    this.containsUser = function(gameUser){
        var users = this.users;
        for(var i in users)
            if(users[i].uid == gameUser.uid)
                return users[i];
        return false
    }
    this.owner = function(){
        return this.users[0];
    }
    this.findUserById = function(uid){
        var users = this.users;
        for(var i in users)
            if(users[i].uid == uid)
                return users[i];
        return null;
    }
}