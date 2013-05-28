package com.hellsepontus.model;

import com.corundumstudio.socketio.SocketIOClient;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Room implements IJsonable{
    private static int roomIdCounter = 0;
    public int roomId;
    public ArrayList<GameUser> users;
    
    public Room(){
        users = new ArrayList();
    }

    public static Room instantiate(){
        return instantiate(++roomIdCounter);
    }
    
    public static Room instantiate(int id){
        Room room = new Room();
        room.roomId = id;
        return room;
    }

    public GameUser findUserByClient(SocketIOClient client) {
        for(GameUser user : users)
            if(user.getClient().equals(client))
                return user;
        return null;
    }
    
    public void addUser(GameUser user){
        users.add(user);
        user.setRoom(this);
    }
    
    public void removeUser(GameUser user){
        if(user.isOwner()){
            Model.instance.destroyRoom(this.roomId);
        }else {
            users.remove(user);
            user.setRoom(null);
        }
    }
    
    public boolean containsUser(int uid) {
        for(GameUser user : users)
            if(user.uid == uid)
                return true;
        return false;
    }

    public Map<String, Object> toData() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("roomId", this.roomId);
        List<Object> users = new ArrayList<Object>();
        for(GameUser u : this.users)
            users.add(u.toData());
        result.put("users", users);
        return result;
    }

    public void fromData(Map<String, Object> data) {
        throw new NotImplementedException();
    }

    public GameUser owner() {
        return users.get(0);
    }
}
