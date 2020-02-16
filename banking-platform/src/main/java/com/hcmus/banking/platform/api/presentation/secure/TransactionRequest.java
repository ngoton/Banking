package com.hcmus.banking.platform.api.presentation.secure;

import lombok.Getter;

@Getter
public class TransactionRequest {
    ContentRequest content;

    public TransactionRequest(ContentRequest content){
        this.content = content;
    }

    public TransactionRequest(){}
}
