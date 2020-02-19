package com.hcmus.banking.platform.core.presentation.debit;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.debit.Debit;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DebitResponse {
    public Long id;
    public String account;
    public BigDecimal money;
    public String content;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;

    public DebitResponse(Debit debit) {
        this.id = debit.getId();
        this.account = debit.getAccount();
        this.money = debit.getMoney();
        this.content = debit.getContent();
        this.createdAt = debit.getCreated().getCreatedAt().getValue();
    }
}
