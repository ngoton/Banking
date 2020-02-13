package com.hcmus.banking.platform.api.presentation.insecure.account;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ContentRequest {
    @NotNull(message = "Account is required")
    String account;

    public ContentRequest(String account){
        this.account = account;
    }

    public ContentRequest(){}
}
