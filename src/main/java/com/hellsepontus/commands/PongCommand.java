package com.hellsepontus.commands;

public class PongCommand extends Command{
    public static final String ID = "pong";

    public PongCommand() {
        super(ID);
    }
    
    @Override
    public void execute() {
        this.send();
    }
}
