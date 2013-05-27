package com.hellsepontus.commands;

public class ConfigRequestCommand extends Command{
    public static final String ID = "config";
    
    public ConfigRequestCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        send(ID, model.getPropertiesMap());
        client.disconnect();
    }
}
