package com.hcmus.banking.platform.core.presentation.payment;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.payment.Payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentResponse {
    public Long id;
    public String account;
    public BigDecimal balance;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;
    public Integer status;

    public PaymentResponse(Payment payment) {
        this.id = payment.getId();
        this.account = payment.getAccount();
        this.balance = payment.getBalance();
        this.status = payment.getStatus();
        this.createdAt = payment.getCreated().getCreatedAt().getValue();
    }
}
