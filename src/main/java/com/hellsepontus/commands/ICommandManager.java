package com.hellsepontus.commands;

import com.hellsepontus.model.GameUser;
import com.hellsepontus.model.Model;

public interface ICommandManager {
    void send(ICommandClient client, String commandId, Object data);
    Model model();
    GameUser getOrCreateUser(ICommandClient client);
}
