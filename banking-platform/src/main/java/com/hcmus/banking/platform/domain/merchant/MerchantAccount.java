package com.hcmus.banking.platform.domain.merchant;

import lombok.Getter;

@Getter
public class MerchantAccount {
    public String name;

    public MerchantAccount(String name){
        this.name = name;
    }
}
