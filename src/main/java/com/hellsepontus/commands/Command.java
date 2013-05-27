package com.hellsepontus.commands;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.hellsepontus.model.Model;

import java.lang.reflect.Field;
import java.util.*;
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
    
    private final Set<String> excludedReflectFields = new HashSet<String>(Arrays.asList("id", 
                                                                                        "client", 
                                                                                        "ackRequest", 
                                                                                        "model"));
    
    public Command(String id){
        this.id = id;
    }
    
    public void execute() {
        
    }
    
    public Map<String, String> toData() {
        HashMap<String, String> result = new HashMap<String, String>();
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
    
    public static Command createCommand(String id, SocketIOClient client, AckRequest request, Model model) {
        Class<? extends Command> commandClass = get(id);
        if(commandClass != null){
            try {
                Command command = commandClass.newInstance();
                command.client = client;
                command.ackRequest = request;
                command.model = model;
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
        return createCommand(id, creator.client, creator.ackRequest, creator.model);
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

    public void send(String id, Map<String, String> data){
        CommandData commandData = new CommandData();
        commandData.id = id;
        commandData.data = data;
        this.send(commandData);
    }

    public void send(CommandData commandData){
        if(ackRequest.isAckRequested())
            ackRequest.sendAckData(commandData);
        else
            client.sendEvent(EVENT_NAME, commandData);
        if(logger.isLoggable(Level.INFO))
            logger.info("Command '" + commandData.id + "' sended to client");
    }
    
    public void sendToAll(Command command) {
        CommandData commandData = new CommandData();
        commandData.id = command.id;
        commandData.data = command.toData();
        this.sendToAll(commandData);
    }

    public void sendToAll(CommandData commandData){
        server.getBroadcastOperations().sendEvent(EVENT_NAME, commandData);
        if(logger.isLoggable(Level.INFO))
            logger.info("Command '" + commandData.id + "' sended broadcast");
    }
}
