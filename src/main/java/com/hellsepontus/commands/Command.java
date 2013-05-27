package com.hellsepontus.commands;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.hellsepontus.model.GameUser;
import com.hellsepontus.model.IJsonable;
import com.hellsepontus.model.Model;
import com.hellsepontus.model.Room;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Command {
    public static final String EVENT_NAME = "cmd";
    public static SocketIOServer server; 
    protected static Map<String, Class<? extends Command>> commands = new HashMap<String, Class<? extends Command>>();
    protected static Logger logger = Logger.getLogger(Command.class.getName());
    
    public String id;
    public SocketIOClient client;
    public AckRequest ackRequest;
    public Model model;
    public Map<String, Object> data;
    
    private final Set<String> excludedReflectFields = new HashSet<String>(Arrays.asList("id", 
                                                                                        "client", 
                                                                                        "ackRequest", 
                                                                                        "model",
                                                                                        "data"));
    
    public Command(String id){
        this.id = id;
        this.model = Model.instance;
    }
    
    public void execute() {
        
    }
    
    public Map<String, Object> toData() {
        HashMap<String, Object> result = new HashMap<String, Object>();
        try {                
            for(Field field : this.getClass().getDeclaredFields())
                if(field.isAccessible() && !excludedReflectFields.contains(field.getName()))
                    result.put(field.getName(), field.get(this).toString());
        } catch (IllegalAccessException e) {
            logger.warning(e.toString());
        }
        return result;
    }
    
    public static void add(String id, Class<? extends Command> clazz) {
        commands.put(id, clazz);
    }
    
    private static Class<? extends Command> get(String id) {
        return commands.get(id);
    }
    
    public static Command createCommand(String id, Map<String, Object> data, SocketIOClient client, AckRequest request, Model model) {
        Class<? extends Command> commandClass = get(id);
        if(commandClass != null){
            try {
                Command command = commandClass.newInstance();
                command.client = client;
                command.ackRequest = request;
                command.model = model;
                command.data = data;
                
                Field[] fields = data.getClass().getFields();
                for(Map.Entry entry : data.entrySet()){
                    Field cmdField = null;
                    try {
                        cmdField = command.getClass().getField((String)entry.getKey());
                    } catch (NoSuchFieldException e) {
                    }
                    if(cmdField != null){
                        try{
                            cmdField.set(command, entry.getValue());
                        }catch (Exception ex){
                            logger.finer("Can't assign field " + entry.getKey() + " to command " + command);
                        }
                    }
                }
                
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
        return createCommand(id, creator.data, creator.client, creator.ackRequest, creator.model);
    }

    public void send() {
        this.send(this);
    }
    
    public void send(Command command){
        CommandData commandData = new CommandData();
        commandData.id = command.id;
        commandData.data = command.toData();
        this.send(commandData);
    }

    public void send(String id, Map<String, Object> data){
        CommandData commandData = new CommandData();
        commandData.id = id;
        commandData.data = data;
        this.send(commandData);
    }

    public void send(CommandData commandData){
        if(ackRequest.isAckRequested())
            ackRequest.sendAckData(commandData);
        else
            client.sendEvent(EVENT_NAME, checkJsonData(commandData));
        if(logger.isLoggable(Level.INFO))
            logger.info("Command '" + commandData.id + "' sended to client");
    }
    
    public void sendToAll(Room room, Command command) {
        this.sendToAll(room, command.id, command.toData());
    }

    public void sendToAll(Room room, String id, Map<String, Object> data) {
        CommandData commandData = new CommandData();
        commandData.id = id;
        commandData.data = data;
        this.sendToAll(room, commandData);
    }

    public void sendToAll(Room room, CommandData commandData){
        for(GameUser user : room.users)
            user.getClient().sendEvent(EVENT_NAME, checkJsonData(commandData));
        if(logger.isLoggable(Level.INFO))
            logger.info("Command '" + commandData.id + "' sended broadcast");
    }
    
    private GameUser cachedGameUser;
    public GameUser getUser() {
        if(cachedGameUser == null)
            cachedGameUser = model.getOrCreateUser(client);
        return cachedGameUser;
    }
    
    private static Object checkJsonData(CommandData commandData) {
        Map<String, Object> origData = commandData.data;
        Map<String, Object> newData = new HashMap<String, Object>();
        for(Map.Entry<String, Object> entry : origData.entrySet())
            if(entry.getValue() instanceof IJsonable)
                newData.put(entry.getKey(), ((IJsonable)entry.getValue()).toData());
            else
                newData.put(entry.getKey(), entry.getValue());
        commandData.data = newData;
        return commandData;
    }
}
