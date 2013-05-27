package com.hellsepontus.commands;

import com.corundumstudio.socketio.SocketIOServer;

import java.util.HashMap;
import java.util.Map;

public class Command {
    public static final String EVENT_NAME = "cmd";
    public static SocketIOServer server; 
    protected static Map<String, Class<? extends Command>> commands = new HashMap<String, Class<? extends Command>>();
    
    public String id;
    
    public Command(String id){
        this.id = id;
    }
    
    public void execute() {
        
    }
    
    public Map toData() {
        return new HashMap();
    }
    
    public static void add(String id, Class<? extends Command> clazz) {
        commands.put(id, clazz);
    }
    
    public static Class<? extends Command> get(String id) {
        return commands.get(id);
    }
    
    public void send(){
        CommandData data = new CommandData();
        data.id = this.id;
        data.data = this.toData();
        server.getBroadcastOperations().sendEvent(EVENT_NAME, data);
    }
}
