package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentTransactionResponse {
    public String code;
    public BigDecimal money;
    public String content;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;

    public PaymentTransactionResponse(PaymentTransaction paymentTransaction) {
        this.code = paymentTransaction.getCode();
        this.money = paymentTransaction.getMoney();
        this.content = paymentTransaction.getContent();
        this.createdAt = paymentTransaction.getCreated().getCreatedAt().getValue();
    }
}
