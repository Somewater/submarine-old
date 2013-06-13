package com.hellsepontus.socketio;

import com.hellsepontus.commands.ICommandClient;
import com.hellsepontus.commands.ICommandManager;
import com.hellsepontus.model.GameUser;
import com.hellsepontus.model.IJson;
import com.hellsepontus.model.Model;

import java.util.HashMap;
import java.util.Map;

public class CommandManager implements ICommandManager {

    protected static final String EVENT_NAME = "cmd";
    
    protected Model model;
    
    public CommandManager(Model model){
        this.model = model;
    }
    
    public void send(ICommandClient client, String commandId, Object data) {
        ((Client)client).nativeClient().sendEvent(EVENT_NAME, checkJsonData(data));
    }

    public Model model() {
        return model;
    }

    public GameUser getOrCreateUser(ICommandClient client) {
        Client socketIOClient = (Client) client;
        int sessionHashCode = socketIOClient.nativeClient().getSessionId().hashCode();
        GameUser user = model.userById.get(sessionHashCode);
        if(user == null){
            user = GameUser.instantiate();
            user.setClient(client);
            model.userById.put(sessionHashCode, user);
        }
        return user;
    }

    private static Object checkJsonData(Object data) {
        Map<String, Object> origData = null;
        if(Map.class.isInstance(data))
            origData = (Map<String, Object>) data;
        else if(IJson.class.isInstance(data))
            origData = ((IJson)data).toData();
        if(origData != null){
            Map<String, Object> newData = new HashMap<String, Object>();
            for(Map.Entry<String, Object> entry : origData.entrySet())
                if(entry.getValue() instanceof IJson)
                    newData.put(entry.getKey(), ((IJson)entry.getValue()).toData());
                else
                    newData.put(entry.getKey(), entry.getValue());
            return newData;
        }else
            return data;
    }
}
