package com.hcmus.banking.platform.api.presentation.insecure.account;

import lombok.Getter;

@Getter
public class AccountRequest {
    ContentRequest content;

    public AccountRequest(ContentRequest content){
        this.content = content;
    }

    public AccountRequest(){}
}
