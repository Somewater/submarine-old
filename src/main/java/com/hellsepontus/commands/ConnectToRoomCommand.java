package com.hellsepontus.commands;

import com.hellsepontus.model.Room;

import java.util.Collections;

public class ConnectToRoomCommand extends Command {
    
    public static final String ID = "roomconn";
    public int roomId;
    
    public ConnectToRoomCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        Room room = manager.model().getOrCreateRoom(this.roomId);
        if(room.containsUser(getUser().uid))
            throw new RuntimeException("Already in room");
        room.addUser(getUser());
        send(ID, Collections.singletonMap("room", (Object) room));
        new AddRoomUserCommand(room, getUser()).execute();
    }
}
