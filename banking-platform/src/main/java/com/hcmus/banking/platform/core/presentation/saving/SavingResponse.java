package com.hcmus.banking.platform.core.presentation.saving;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.saving.Saving;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SavingResponse {
    public String account;
    public BigDecimal balance;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;

    public SavingResponse(Saving saving) {
        this.account = saving.getAccount();
        this.balance = saving.getBalance();
        this.createdAt = saving.getCreated().getCreatedAt().getValue();
    }
}
