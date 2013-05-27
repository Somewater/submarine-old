package com.hellsepontus.commands;

import com.hellsepontus.model.Room;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RoomListRequestCommand extends Command{
    public static final String ID = "rooms";

    public RoomListRequestCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        List rooms = Arrays.asList(Room.instantiate(1));
        send(ID, Collections.singletonMap("rooms", (Object)rooms));
    }
}
