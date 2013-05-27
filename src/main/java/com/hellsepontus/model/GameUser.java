package com.hellsepontus.model;

import com.corundumstudio.socketio.SocketIOClient;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.HashMap;
import java.util.Map;

public class GameUser implements IJsonable{
    public int uid;
    private static int uidCounter = 0;
    private SocketIOClient client;
    private Room room;

    public GameUser(){
    }
    
    public SocketIOClient getClient(){ return client; }
    public void setClient(SocketIOClient client){ this.client = client; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room;}

    public static GameUser instantiate(){
        return instantiate(++uidCounter);
    }
    
    public static GameUser instantiate(int uid) {
        GameUser user = new GameUser();
        user.uid = uid;
        return user;
    }

    public Map<String, Object> toData() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("uid", this.uid);
        return result;
    }

    public void fromData(Map<String, Object> data) {
        throw new NotImplementedException();
    }
}
