package com.hellsepontus.commands;

import com.hellsepontus.model.GameUser;
import com.hellsepontus.model.Model;
import com.hellsepontus.model.Room;

import java.util.*;
import java.util.logging.Logger;

public class Command {
    protected static Map<String, Class<? extends Command>> commands = new HashMap<String, Class<? extends Command>>();
    protected static Logger logger = Logger.getLogger(Command.class.getName());
    
    public String id;
    protected ICommandClient client;
    protected Map<String, Object> data;
    protected ICommandManager manager;
    
    public Command(String id){
        this.id = id;
    }
    
    public void execute() {
        
    }
    
    public Map<String, Object> toData() {
        return data;
    }
    
    public void readData(Object data){
        this.data = (Map<String, Object>)data;
    }
    
    public static void add(String id, Class<? extends Command> clazz) {
        commands.put(id, clazz);
    }
    
    private static Class<? extends Command> get(String id) {
        return commands.get(id);
    }
    
    public static Command createCommand(String id, Map<String, Object> data, ICommandClient client, ICommandManager manager) {
        Class<? extends Command> commandClass = get(id);
        if(commandClass != null){
            try {
                Command command = commandClass.newInstance();
                command.client = client;
                command.manager = manager;
                command.data = data;
                
                return command;
            } catch (InstantiationException e) {
                throw new RuntimeException("Command " + id + " instantiation error", e);
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Command " + id + " instantiation error", e);
            }
        }else
            throw new RuntimeException("Undefined command id=" + id);
    }
    
    public static Command createCommand(String id, Command creator) {
        return createCommand(id, creator.data, creator.client, creator.manager);
    }

    public void send() {
        this.send(this);
    }
    
    public void send(Command command){
        this.send(command.id, (Map<String, Object>)command.toData());
    }

    public void send(String id, Map<String, Object> commandData){
        manager.send(userToSend(), id, commandData);
    }
    
    protected ICommandClient userToSend(){
        return client;
    }

    protected List<GameUser> usersToSend(Room room) {
        return room.users();
    }
    
    public void sendToAll(Room room, Command command) {
        this.sendToAll(room, command.id, (Map<String, Object>)command.toData());
    }

    public void sendToAll(Room room, String id, Map<String, Object> data) {
        List<GameUser> users = usersToSend(room); 
        for(GameUser user : users)
            manager.send(user.getClient(), id, data);
    }
    
    private GameUser cachedGameUser;
    public GameUser getUser() {
        if(cachedGameUser == null)
            cachedGameUser = manager.getOrCreateUser(client);
        return cachedGameUser;
    }
    
    protected Model model() {
        return manager.model();
    }
}
