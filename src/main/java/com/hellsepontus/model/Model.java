package com.hellsepontus.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Model {
    public Map<Integer, Room> roomById;
    public Properties config;
    private Map<String, String> propertiesMap;
    
    public Model(Properties properties){
        this.config = properties;
        roomById = new HashMap<Integer, Room>();
    }
    
    public Map<String, String> getPropertiesMap() {
        if(propertiesMap != null)
            return propertiesMap;
        propertiesMap = new HashMap<String, String>();
        for(String field : config.stringPropertyNames())
            propertiesMap.put(field, config.getProperty(field));
        return propertiesMap;
    }
}
