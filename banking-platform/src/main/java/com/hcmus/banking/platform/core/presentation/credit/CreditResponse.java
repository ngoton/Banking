package com.hcmus.banking.platform.core.presentation.credit;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.credit.Credit;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CreditResponse {
    public Long id;
    public String account;
    public BigDecimal money;
    public String content;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;

    public CreditResponse(Credit credit) {
        this.id = credit.getId();
        this.account = credit.getAccount();
        this.money = credit.getMoney();
        this.content = credit.getContent();
        this.createdAt = credit.getCreated().getCreatedAt().getValue();
    }
}
