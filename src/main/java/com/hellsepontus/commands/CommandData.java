package com.hellsepontus.commands;

import java.util.Map;

public class CommandData {
    public String id;
    public Map<String, Object> data;
    
    public CommandData(String id, Map<String, Object> data){
        this.id = id;
        this.data = data;
    }
}
