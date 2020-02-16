package com.hcmus.banking.platform.api.presentation.secure;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
public class ContentRequest {
    @NotNull(message = "Account is required")
    String account;
    @NotNull(message = "Amount is required")
    BigDecimal amount;
    @NotNull(message = "Content is required")
    String content;

    public ContentRequest(String account, BigDecimal amount, String content){
        this.account = account;
        this.amount = amount;
        this.content = content;
    }

    public ContentRequest(){}
}
