package com.hellsepontus.model;

import java.util.Map;

public interface IJson {
    Map<String, Object> toData();
    void fromData(Map<String, Object> data);
}
