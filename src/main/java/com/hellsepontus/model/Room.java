package com.hellsepontus.model;

import com.corundumstudio.socketio.SocketIOClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Room implements IJson {
    private static int roomIdCounter = 0;
    private int roomId;
    private ArrayList<GameUser> users;
    private IRoomDestroyer destroyer;
    
    private Room(IRoomDestroyer destroyer){
        users = new ArrayList();
        this.destroyer = destroyer;
    }

    protected static Room instantiate(IRoomDestroyer destroyer){
        return instantiate(++roomIdCounter, destroyer);
    }
    
    protected static Room instantiate(int id, IRoomDestroyer destroyer){
        Room room = new Room(destroyer);
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
            destroyer.destroyRoom(this.roomId);
            destroyer = null;
        }else {
            users.remove(user);
            user.setRoom(null);
        }
    }
    
    public List<GameUser> users(){
        return users;
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
        throw new NoSuchMethodError();
    }

    public GameUser owner() {
        return users.get(0);
    }
    
    public interface IRoomDestroyer{
        void destroyRoom(int roomId);
    }
}
