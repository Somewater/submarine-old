package com.hellsepontus.commands;

public class PingCommand extends Command{
    public static final String ID = "ping";

    public PingCommand() {
        super(ID);
    }

    @Override
    public void execute() {
        new PongCommand().execute();
    }
}
