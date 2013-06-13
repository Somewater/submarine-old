package com.hellsepontus.socketio;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.hellsepontus.commands.CommandData;
import com.hellsepontus.commands.Command;
import com.hellsepontus.commands.RemoveRoomUserCommand;
import com.hellsepontus.model.Model;
import com.hellsepontus.model.Room;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Server {

    private static Logger logger = Logger.getLogger(Server.class.getName());
    
    private SocketIOServer backend;
    private CommandManager manager;
    private Map<Integer, Client> commandClientBy;
    
    public Server(Model model){
        manager = new CommandManager(model);
        Configuration backendConfig = new Configuration();
        backendConfig.setHostname("0.0.0.0");
        backend = new SocketIOServer(backendConfig);
        commandClientBy = new HashMap<Integer, Client>();
    }
    
    public void start(int port){
        backend.getConfiguration().setPort(port);
        backend.addConnectListener(new ConnectListener() {
            public void onConnect(SocketIOClient client) {
                logger.fine("Client #" + client.getSessionId() + " connected!");
            }
        });
        backend.addEventListener(CommandManager.EVENT_NAME, CommandData.class, new DataListener<CommandData>() {
            public void onData(SocketIOClient client, CommandData data, AckRequest ackRequest){
                try {
                    Client commandClient = getOrCreate(client);
                    Command command = Command.createCommand(data.id, data.data, commandClient, manager);
                    if(logger.isLoggable(Level.INFO))
                        logger.finest("Command '" + command.id + "' received: " + command.toString());
                    command.execute();
                }catch (Exception ex){
                    logger.throwing(Server.class.getName(), "start", ex);
                }
            }
        });
        backend.addDisconnectListener(new DisconnectListener() {
            public void onDisconnect(SocketIOClient client) {
                Client commandClient = getOrCreate(client);
                logger.fine("Client #" + client.getSessionId() + " disconnected");
                Room room = manager.model.findRoomByClient(commandClient);
                if(room != null)
                    new RemoveRoomUserCommand(room.findUserByClient(client)).execute();
                deleteClient(client);
            }
        });
    }

    public void stop() {
        backend.stop();
    }
    
    private Client getOrCreate(SocketIOClient client) {
        Client commandClient = commandClientBy.get(client.getSessionId().hashCode());
        if(commandClient == null){
            commandClient = new Client(client);
            commandClientBy.put(client.getSessionId().hashCode(), commandClient);
        }
        return commandClient;
    }
    
    private void deleteClient(SocketIOClient client) {
        commandClientBy.remove(client.getSessionId().hashCode());
    }
}
