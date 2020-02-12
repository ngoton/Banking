package com.hcmus.banking.platform.core.presentation.savingTransaction;

import com.hcmus.banking.platform.core.utils.RandomUtils;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.saving.Saving;
import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
public class SavingTransactionRequest {
    @NotNull(message = "Content is required")
    public String content;
    @NotNull(message = "Money is required")
    public BigDecimal money;
    @NotNull
    public Long savingId;

    public static SavingTransaction toSavingTransaction(SavingTransactionRequest savingTransactionRequest, Saving saving) {
        return new SavingTransaction(
                savingTransactionRequest.money,
                savingTransactionRequest.content,
                saving,
                Created.ofEmpty());
    }
}
