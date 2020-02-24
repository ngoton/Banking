package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.domain.debit.Debit;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;

import java.math.BigDecimal;


public class PaymentResponse {
    public BigDecimal money;
    public String content;
    public Long paymentId;
    public Long beneficiaryId;
    public Boolean fee;
    public Long debitId;

    public PaymentResponse(PaymentTransaction paymentTransaction, Boolean fee) {
        this.money = paymentTransaction.getMoney();
        this.content = paymentTransaction.getContent();
        this.beneficiaryId = paymentTransaction.getBeneficiary().getId();
        this.paymentId = paymentTransaction.getPayment().getId();
        this.fee = fee;
        this.debitId = Long.MIN_VALUE;
    }

    public PaymentResponse(PaymentTransaction paymentTransaction, Boolean fee, Debit debit) {
        this.money = paymentTransaction.getMoney();
        this.content = paymentTransaction.getContent();
        this.beneficiaryId = paymentTransaction.getBeneficiary().getId();
        this.paymentId = paymentTransaction.getPayment().getId();
        this.fee = fee;
        this.debitId = debit.getId();
    }
}
