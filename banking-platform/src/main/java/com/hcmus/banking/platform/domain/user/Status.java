package com.hcmus.banking.platform.domain.user;

import lombok.Getter;

@Getter
public enum Status {
    ACTIVE, EXPIRED, LOCKED;

    public boolean isActive(){
        return this == ACTIVE;
    }

    public boolean isExpired(){
        return this == EXPIRED;
    }

    public boolean isLocked(){
        return this == LOCKED;
    }
}
