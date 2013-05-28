package com.hellsepontus.commands.logic;

import com.hellsepontus.commands.CastCommand;
import com.hellsepontus.commands.Command;

import java.util.Map;

public class ChangePropCommand extends CastCommand{
    
    public static final String ID = "changeprop";
    
    public ChangePropCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        Command responseCmd = Command.createCommand(ChangePropApplyCommand.ID, this);
        responseCmd.execute();
    }

    public static class ChangePropApplyCommand extends CastCommand{

        public static final String ID = "changeprop-apply";

        public ChangePropApplyCommand() {
            super(ID);
        }

        @Override
        public void execute() {
            sendToAll();
        }

        @Override
        public Map<String, Object> toData() {
            return this.data;
        }
    }
}
