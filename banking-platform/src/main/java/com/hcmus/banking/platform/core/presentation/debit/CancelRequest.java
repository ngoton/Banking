package com.hcmus.banking.platform.core.presentation.debit;

import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
public class CancelRequest {
    @NotNull(message = "Debit is required")
    public Long debitId;
    @NotNull(message = "Content is required")
    public String content;
}
