package com.hellsepontus.commands;

import java.util.Map;

public class ConfigRequestCommand extends Command{
    public static final String ID = "config";
    
    public ConfigRequestCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        send(ID, (Map) model.getPropertiesMap());
    }
}
