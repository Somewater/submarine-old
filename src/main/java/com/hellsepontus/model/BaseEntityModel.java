package com.hellsepontus.model;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

public class BaseEntityModel implements Map<String, String> {
    
    protected static final Logger logger = Logger.getLogger(BaseEntityModel.class.getName());
    
    public int size() {
        return keySet().size();
    }

    public boolean isEmpty() {
        return size() == 0;
    }

    public boolean containsKey(Object key) {
        return keySet().contains(key);
    }

    public boolean containsValue(Object value) {
        return values().contains(value);
    }

    public String get(Object key) {
        try {
            return (String)this.getClass().getField(key.toString()).get(this);
        } catch (IllegalAccessException e) {
        } catch (NoSuchFieldException e) {
        }
        return null;
    }

    public String put(String key, String value) {
        try {
            this.getClass().getField(key).set(this, value);
        } catch (IllegalAccessException e) {
            return null;
        } catch (NoSuchFieldException e) {
            return null;
        }
        return value;
    }

    public String remove(Object key) {
        return put((String)key, null);
    }

    public void putAll(Map<? extends String, ? extends String> m) {
        throw new NotImplementedException();
    }

    public void clear() {
        throw new NotImplementedException();
    }

    public Set<String> keySet() {
        Set<String> result = new HashSet<String>();
        for(Field field : getClass().getFields())
            result.add(field.getName());
        return result;
    }

    public Collection<String> values() {
        Set<String> result = new HashSet<String>();
        try {
        for(Field field : getClass().getFields())
            result.add(field.get(this).toString());
        } catch (IllegalAccessException e) {
            logger.warning(e.getMessage());
        }            
        return result;
    }

    public Set<Entry<String, String>> entrySet() {
        Set<Entry<String, String>> result = new HashSet<Entry<String, String>>();
        try {
            for(Field field : getClass().getFields()){
                Entry entry = new SimpleEntry(field.getName(), field.get(this));
                result.add(entry);
            }
        } catch (IllegalAccessException e) {
            logger.warning(e.getMessage());
        }
        return result;
    }

    static class SimpleEntry<K, V> implements Entry<K, V> {

        private final K key;

        private V value;

        public SimpleEntry(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public SimpleEntry(Entry<? extends K, ? extends V> entry) {
            key = entry.getKey();
            value = entry.getValue();
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }

        public V setValue(V value) {
            V oldValue = this.value;
            this.value = value;
            return oldValue;
        }

        @Override
        public boolean equals(Object o) {
            if (!(o instanceof Map.Entry<?, ?>)) {
                return false;
            }
            @SuppressWarnings("rawtypes")
            Map.Entry e = (Map.Entry) o;
            return eq(key, e.getKey()) && eq(value, e.getValue());
        }

        @Override
        public int hashCode() {
            return (key == null? 0 : key.hashCode()) ^ (value == null? 0 : value.hashCode());
        }

        @Override
        public String toString() {
            return key + "=" + value;
        }

        private static boolean eq(Object o1, Object o2) {
            return o1 == null? o2 == null : o1.equals(o2);
        }
    }
}
