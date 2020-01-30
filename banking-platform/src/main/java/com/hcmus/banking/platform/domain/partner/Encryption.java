package com.hcmus.banking.platform.domain.partner;

import lombok.Getter;

@Getter
public enum Encryption {
    RSA, PGP, NONE;

    public boolean isRSA(){
        return this == RSA;
    }

    public boolean isPGP(){
        return this == PGP;
    }
}
