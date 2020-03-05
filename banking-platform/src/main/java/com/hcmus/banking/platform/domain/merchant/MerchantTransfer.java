package com.hcmus.banking.platform.domain.merchant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MerchantTransfer {
    private static final String EMPTY_VALUE = "";
    String message;

    public static MerchantTransfer ofEmpty(){
        return new MerchantTransfer(EMPTY_VALUE);
    }

    public boolean isEmpty(){
        return message.equals(EMPTY_VALUE);
    }
}
