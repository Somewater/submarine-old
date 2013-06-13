package com.hellsepontus.socketio;

import com.corundumstudio.socketio.SocketIOClient;
import com.hellsepontus.commands.ICommandClient;

public class Client implements ICommandClient<SocketIOClient>{
    
    private SocketIOClient nativeClient;    
    
    public Client(SocketIOClient nativeClient){
        this.nativeClient = nativeClient;
    }
    
    public SocketIOClient nativeClient() {
        return nativeClient;
    }

    public boolean equals(ICommandClient other) {
        SocketIOClient otherNativeClient = ((Client)other).nativeClient();
        return otherNativeClient.getSessionId().equals(this.nativeClient.getSessionId());
    }
}
