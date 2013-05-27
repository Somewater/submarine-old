package com.hellsepontus.commands;

import com.hellsepontus.model.GameUser;
import com.hellsepontus.model.Room;

import java.util.Collections;

public class AddRoomUserCommand extends Command {

    public static final String ID = "adduser";
    public GameUser user;
    public Room room;
    
    public AddRoomUserCommand(Room room, GameUser user) {
        super(ID);
        this.user = user;
        this.room = room;
    }

    @Override
    public void execute() {
        sendToAll(user.getRoom(), ID, Collections.singletonMap("user", (Object) user));
    }

    @Override
    public GameUser getUser() {
        return user;
    }
}
