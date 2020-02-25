package com.hcmus.banking.platform.core.presentation.credit;

import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
public class CancelRequest {
    @NotNull(message = "Credit is required")
    public Long creditId;
    @NotNull(message = "Content is required")
    public String content;
}
