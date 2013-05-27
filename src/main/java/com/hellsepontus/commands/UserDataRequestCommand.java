package com.hellsepontus.commands;

import com.hellsepontus.model.GameUser;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class UserDataRequestCommand extends Command{
    public static final String ID = "userdata";

    public UserDataRequestCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        GameUser user = getUser();
        send(ID, Collections.singletonMap("user", (Object)user));
    }
}
