import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;

import java.lang.InterruptedException;
import java.lang.String;

import com.corundumstudio.socketio.listener.*;
import com.corundumstudio.socketio.*;
import com.hellsepontus.commands.Command;
import com.hellsepontus.commands.CommandData;
import com.hellsepontus.commands.PingCommand;
import com.hellsepontus.commands.PongCommand;

public class GameServer {
    
    public static void main(String[] args) throws InterruptedException{
        int port = 4000;
        if(args.length > 0)
            port = Integer.parseInt(args[0]);
        
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(port);
        
        configurateCommands();

        final SocketIOServer server = new SocketIOServer(config);
        Command.server = server;
        server.addEventListener(Command.EVENT_NAME, CommandData.class, new DataListener<CommandData>() {
            public void onData(SocketIOClient client, CommandData data, AckRequest ackRequest){
                Class<? extends Command> clazz = Command.get(data.id);
                try {
                    Command command = clazz.newInstance();

                    command.execute();
                }catch (Exception ex){
                    ex.printStackTrace();
                }
            }
        });

        server.start();
        System.out.println("GameServer started on port " + port);

        Thread.sleep(Integer.MAX_VALUE);

        server.stop();       
    }
    
    private static void configurateCommands(){
        Command.add(PingCommand.ID, PingCommand.class);
        Command.add(PongCommand.ID, PongCommand.class);
    }
}