package com.hcmus.banking.platform.domain.merchant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MerchantAccount {
    private static final String EMPTY_VALUE = "";
    public String name;

    public static MerchantAccount ofEmpty(){
        return new MerchantAccount(EMPTY_VALUE);
    }

    public boolean isEmpty(){
        return name.equals(EMPTY_VALUE);
    }
}
