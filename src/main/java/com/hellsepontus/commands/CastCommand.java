package com.hellsepontus.commands;

import com.corundumstudio.socketio.SocketIOClient;
import com.hellsepontus.model.GameUser;
import com.hellsepontus.model.Room;

import java.util.Collections;
import java.util.List;

/**
 * Базовый класс для событий игровой логики
 * После выполнения логики, отослать команду при помощи send() или sendToAll
 */
public class CastCommand extends Command {   
    public CastCommand(String id) {
        super(id);
    }
    
    public void sendToAll(){
        if(getUser().isOwner())
            this.sendToAll(getUser().getRoom(), this);
        else 
            throw new RuntimeException("User uid=" + getUser().uid + " not owner of room but try to send broadcast message");
    }

    @Override
    public void send() {
        if(this.getUser().isOwner())
            throw new RuntimeException("User uid=" + getUser().uid + " owner of room, cant send non broadcast messages");
        else
            super.send();
    }

    @Override
    protected List<GameUser> usersToSend(Room room) {
        return room.users().subList(1, room.users().size());
    }

    @Override
    protected ICommandClient userToSend() {
        return getUser().getRoom().users().get(0).getClient();
    }
}
