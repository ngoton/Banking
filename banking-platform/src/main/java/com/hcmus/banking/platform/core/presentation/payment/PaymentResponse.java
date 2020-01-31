package com.hcmus.banking.platform.core.presentation.payment;

import com.hcmus.banking.platform.domain.payment.Payment;

import java.math.BigDecimal;

public class PaymentResponse {
    public String account;
    public BigDecimal balance;

    public PaymentResponse(Payment payment) {
        this.account = payment.getAccount();
        this.balance = payment.getBalance();
    }
}
