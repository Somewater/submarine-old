package com.hellsepontus.commands;

import java.util.HashMap;
import java.util.Map;

public class UserDataRequestCommand extends Command{
    public static final String ID = "userdata";

    public UserDataRequestCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        Map<String, String> userData = new HashMap<String, String>();
        send(ID, userData);
        client.disconnect();
    }
}
