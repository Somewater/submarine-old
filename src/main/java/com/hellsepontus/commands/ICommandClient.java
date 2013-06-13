package com.hellsepontus.commands;

public interface ICommandClient<TNativeClient> {
    TNativeClient nativeClient();
    boolean equals(ICommandClient other);
}
