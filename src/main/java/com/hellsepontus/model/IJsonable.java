package com.hellsepontus.model;

import java.util.Map;

public interface IJsonable {
    Map<String, Object> toData();
    void fromData(Map<String, Object> data);
}
