package com.hcmus.banking.platform.core.presentation.savingTransaction;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hcmus.banking.platform.domain.saving.Saving;
import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class SavingTransactionResponse {
    public Long id;
    public String code;
    public BigDecimal money;
    public String content;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    public LocalDateTime createdAt;

    public SavingTransactionResponse(SavingTransaction savingTransaction) {
        this.id = savingTransaction.getId();
        this.code = savingTransaction.getCode();
        this.money = savingTransaction.getMoney();
        this.content = savingTransaction.getContent();
        this.createdAt = savingTransaction.getCreated().getCreatedAt().getValue();
    }
}
