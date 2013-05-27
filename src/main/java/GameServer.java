import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;

import java.io.FileInputStream;
import java.io.IOException;
import java.lang.InterruptedException;
import java.lang.String;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;

import com.corundumstudio.socketio.listener.*;
import com.corundumstudio.socketio.*;
import com.hellsepontus.commands.*;
import com.hellsepontus.model.Model;

public class GameServer {
    
    private static Logger logger = Logger.getLogger(GameServer.class.getName());
    public static Properties properties;
    public static String ROOT;
    public static Model model;
    
    public static void main(String[] args) throws InterruptedException{
        properties = new Properties();
        try{
            properties.load(new FileInputStream("config/server.properties"));
        }catch (IOException e){
            System.err.println("Could not read config file: " + e.toString());
            System.exit(1);
        }
        
        ROOT = properties.getProperty("root", System.getProperty("user.dir"));

        int port = Integer.parseInt(properties.getProperty("port"));
        if(args.length > 0)
            port = Integer.parseInt(args[0]);
        
        if(properties.getProperty("logger").equals("file")){
            try {
                LogManager.getLogManager().readConfiguration(
                        new FileInputStream(ROOT + "/config/logging.config")
                );
            } catch (IOException e) {
                System.err.println("Could not setup logger configuration: " + e.toString());
            }
        }
        
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(port);
        
        configurateCommands();

        final SocketIOServer server = new SocketIOServer(config);
        Command.server = server;
        server.addConnectListener(new ConnectListener() {
            public void onConnect(SocketIOClient client) {
                logger.fine("Client #" + client.getSessionId() + " connected!");
            }
        });
        server.addEventListener(Command.EVENT_NAME, CommandData.class, new DataListener<CommandData>() {
            public void onData(SocketIOClient client, CommandData data, AckRequest ackRequest){
                try {
                    Command command = Command.createCommand(data.id, client, ackRequest, model);
                    if(logger.isLoggable(Level.INFO))
                        logger.info("Command '" + command.id + "' received: " + command.toString());
                    command.execute();
                }catch (Exception ex){
                    ex.printStackTrace();
                }
            }
        });
        server.addDisconnectListener(new DisconnectListener() {
            public void onDisconnect(SocketIOClient client) {
                logger.fine("Client #" + client.getSessionId() + " disconnected");
            }
        });
        
        model = new Model(properties);

        server.start();
        logger.severe("GameServer started on " + server.getConfiguration().getHostname() + ":" + server.getConfiguration().getPort());

        Thread.sleep(Integer.MAX_VALUE);

        server.stop();       
    }
    
    private static void configurateCommands(){
        Command.add(PingCommand.ID, PingCommand.class);
        Command.add(PongCommand.ID, PongCommand.class);
        Command.add(ConfigRequestCommand.ID, ConfigRequestCommand.class);
        Command.add(UserDataRequestCommand.ID, UserDataRequestCommand.class);
        Command.add(RoomListRequestCommand.ID, RoomListRequestCommand.class);
        Command.add(ConnectToRoomCommand.ID, ConnectToRoomCommand.class);
        Command.add(DisconnectFromRoomCommand.ID, DisconnectFromRoomCommand.class);
    }
}