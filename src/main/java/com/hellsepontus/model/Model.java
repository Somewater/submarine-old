package com.hellsepontus.model;

import com.corundumstudio.socketio.SocketIOClient;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Model {
    
    public static Model instance;
    
    public Map<Integer, Room> roomById;
    public Map<Integer, GameUser> userById;
    public Properties config;
    private Map<String, String> propertiesMap;
    
    public Model(Properties properties){
        instance = this;
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
            room = new Room();
            room.roomId = roomId;
            roomById.put(roomId, room);
        }
        return room;
    }
    
    public GameUser getOrCreateUser(SocketIOClient client){
        GameUser user = userById.get(client.getSessionId().hashCode());
        if(user == null){
            user = GameUser.instantiate();
            user.setClient(client);
            userById.put(client.getSessionId().hashCode(), user);
        }
        return user;
    }
    
    public Room findRoomByClient(SocketIOClient client){
        for(Room room : roomById.values())
            for (GameUser user : room.users)
                if(user.getClient().equals(client))
                    return room;
        return null;
    }
}
