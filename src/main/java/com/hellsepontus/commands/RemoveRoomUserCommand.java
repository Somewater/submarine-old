package com.hellsepontus.commands;

import com.hellsepontus.model.GameUser;
import com.hellsepontus.model.Room;

import java.util.Collections;

public class RemoveRoomUserCommand extends Command{
    
    public static final String ID = "removeuser";
    
    public GameUser user;

    public RemoveRoomUserCommand(GameUser user) {
        super(ID);
        this.user = user;
    }

    @Override
    public void execute() {
        Room room = user.getRoom();
        room.removeUser(user);
        sendToAll(room, ID, Collections.singletonMap("user", (Object) user));
    }

    @Override
    public GameUser getUser() {
        return user;
    }
}
