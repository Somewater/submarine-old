package com.hellsepontus.commands.logic;

import com.hellsepontus.commands.CastCommand;
import com.hellsepontus.commands.Command;

import java.util.Map;

public class MoveCommand extends CastCommand{
    
    public static final String ID = "move";
    
    public MoveCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        Command responseCmd = Command.createCommand(MoveApplyCommand.ID, this);
        send(responseCmd);
    }

    public static class MoveApplyCommand extends CastCommand{

        public static final String ID = "move-apply";

        public MoveApplyCommand() {
            super(ID);
        }

        @Override
        public Map<String, Object> toData() {
            return data;
        }
    }
}
