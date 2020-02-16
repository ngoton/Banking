package com.hcmus.banking.platform.api.presentation.secure;

import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
public class TransactionResponse {
    public String account;
    public BigDecimal amount;
    public String content;

    public static TransactionResponse of(PaymentTransaction paymentTransaction){
        return new TransactionResponse(
                paymentTransaction.getPayment().getAccount(),
                paymentTransaction.getMoney(),
                paymentTransaction.getContent()
        );
    }
}
