package com.hellsepontus.model;

import com.hellsepontus.commands.ICommandClient;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Model implements Room.IRoomDestroyer{
    
    public Map<Integer, Room> roomById;
    public Map<Integer, GameUser> userById;
    public Properties config;
    private Map<String, String> propertiesMap;
    
    public Model(Properties properties){
        this.config = properties;
        roomById = new HashMap<Integer, Room>();
        userById = new HashMap<Integer, GameUser>();
    }
    
    public Map<String, String> getPropertiesMap() {
        if(propertiesMap != null)
            return propertiesMap;
        propertiesMap = new HashMap<String, String>();
        for(String field : config.stringPropertyNames())
            propertiesMap.put(field, config.getProperty(field));
        return propertiesMap;
    }
    
    public Room getOrCreateRoom(int roomId){
        Room room = roomById.get(roomId);
        if(room == null){
            room = Room.instantiate(roomId, this);
            roomById.put(roomId, room);
        }
        return room;
    }
    
    public Room findRoomByClient(ICommandClient client){
        for(Room room : roomById.values())
            for (GameUser user : room.users())
                if(user.getClient().equals(client))
                    return room;
        return null;
    }

    public void destroyRoom(int roomId) {
        roomById.remove(roomId);
    }
}
