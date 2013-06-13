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
import com.hellsepontus.commands.logic.ChangePropCommand;
import com.hellsepontus.commands.logic.MoveCommand;
import com.hellsepontus.commands.logic.SyncAllCommand;
import com.hellsepontus.model.Model;
import com.hellsepontus.model.Room;
import com.hellsepontus.socketio.Server;

public class GameServer {
    
    private static Logger logger = Logger.getLogger(GameServer.class.getName());
    public static Properties properties;
    public static String ROOT;
    
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
        
        configurateCommands();
        
        Server server = new Server(new Model(properties));
        server.start(port);
        logger.severe("GameServer started on 0.0.0.0:" + port);

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
        Command.add(RemoveRoomUserCommand.ID, RemoveRoomUserCommand.class);
        Command.add(AddRoomUserCommand.ID, AddRoomUserCommand.class);
        Command.add(SyncAllCommand.ID, SyncAllCommand.class);
        Command.add(SyncAllCommand.SyncAllApplyCommand.ID, SyncAllCommand.SyncAllApplyCommand.class);
        Command.add(MoveCommand.ID, MoveCommand.class);
        Command.add(MoveCommand.MoveApplyCommand.ID, MoveCommand.MoveApplyCommand.class);
        Command.add(ChangePropCommand.ID, ChangePropCommand.class);
        Command.add(ChangePropCommand.ChangePropApplyCommand.ID, ChangePropCommand.ChangePropApplyCommand.class);
    }
}