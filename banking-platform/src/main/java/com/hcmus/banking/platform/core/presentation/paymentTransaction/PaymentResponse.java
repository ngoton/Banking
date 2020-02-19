package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;

import java.math.BigDecimal;


public class PaymentResponse {
    public BigDecimal money;
    public String content;
    public Long paymentId;
    public Long beneficiaryId;
    public Boolean fee;

    public PaymentResponse(PaymentTransaction paymentTransaction, Boolean fee) {
        this.money = paymentTransaction.getMoney();
        this.content = paymentTransaction.getContent();
        this.beneficiaryId = paymentTransaction.getBeneficiary().getId();
        this.paymentId = paymentTransaction.getPayment().getId();
        this.fee = fee;
    }
}
