package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;

import java.math.BigDecimal;

public class PaymentTransactionResponse {
    public String code;
    public BigDecimal money;
    public String content;

    public PaymentTransactionResponse(PaymentTransaction paymentTransaction) {
        this.code = paymentTransaction.getCode();
        this.money = paymentTransaction.getMoney();
        this.content = paymentTransaction.getContent();
    }
}
