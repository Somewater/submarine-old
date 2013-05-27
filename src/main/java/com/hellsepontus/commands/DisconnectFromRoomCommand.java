package com.hellsepontus.commands;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class DisconnectFromRoomCommand extends Command{

    public static final String ID = "roomdisconn";
    
    public DisconnectFromRoomCommand(String id) {
        super(id);
    }

    @Override
    public void execute() {
        throw new NotImplementedException();
    }
}
