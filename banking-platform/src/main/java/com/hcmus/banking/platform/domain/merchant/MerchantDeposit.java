package com.hcmus.banking.platform.domain.merchant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MerchantDeposit {
    private static final String EMPTY_VALUE = "";
    String message;

    public static MerchantDeposit ofEmpty(){
        return new MerchantDeposit(EMPTY_VALUE);
    }

    public boolean isEmpty(){
        return message.equals(EMPTY_VALUE);
    }
}
