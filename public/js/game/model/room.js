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
            if(user && user.uid == userData.uid){
                GameUser.call(user, userData)
                this.users.push(user);
            }else
                this.users.push(new GameUser(userData));
        }
    }
    this.setUsers(data.users || []);
    this.addUser = function(gameUser){
        this.users.push(gameUser);
    }
    this.removeUser = function(gameUser){
        var users = this.users;
        var deleted = false;
        for(var i in users){
            var user2 = users[i];
            if(user2.uid == gameUser.uid){
                users.splice(i, 1);
                deleted = true;
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
}