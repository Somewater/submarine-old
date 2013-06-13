package com.hellsepontus.model;

import com.hellsepontus.commands.ICommandClient;

import java.util.HashMap;
import java.util.Map;

public class GameUser implements IJson {
    public int uid;
    public int score = 0;
    public int health = 100;
    
    private static int uidCounter = 0;
    private ICommandClient client;
    private Room room;

    private GameUser(){
    }
    
    public ICommandClient getClient(){ return client; }
    public void setClient(ICommandClient client){ this.client = client; }

    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room;}

    public static GameUser instantiate(){
        return instantiate(++uidCounter);
    }

    protected static GameUser instantiate(int uid) {
        GameUser user = new GameUser();
        user.uid = uid;
        return user;
    }

    public Map<String, Object> toData() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("uid", this.uid);
        result.put("score", this.score);
        result.put("health", this.health);
        return result;
    }

    public void fromData(Map<String, Object> data) {
        throw new NoSuchMethodError();
    }
    
    public boolean isOwner(){
        return room != null && room.owner().uid == this.uid;
    }
}
