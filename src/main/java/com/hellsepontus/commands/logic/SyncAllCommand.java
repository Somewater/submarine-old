package com.hellsepontus.commands.logic;

import com.hellsepontus.commands.CastCommand;
import com.hellsepontus.commands.Command;

import java.util.Map;

public class SyncAllCommand extends CastCommand{
    
    public static final String ID = "syncall";
    
    public SyncAllCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        Command responseCmd = Command.createCommand(SyncAllApplyCommand.ID, this);
        responseCmd.execute();
    }

    public static class SyncAllApplyCommand extends CastCommand{

        public static final String ID = "syncall-apply";

        public SyncAllApplyCommand() {
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
