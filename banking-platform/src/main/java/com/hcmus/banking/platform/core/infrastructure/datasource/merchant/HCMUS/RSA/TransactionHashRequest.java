package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionHashRequest {
    String clientKey;
    Long validity;
    String accId;
    String transType;
    String feeType;
    Double fee;
    Double amount;
    String note;

    public TransactionHashRequest(String clientKey, TransactionContentRequest transactionContentRequest){
        this.clientKey = clientKey;
        this.validity = transactionContentRequest.getValidity();
        this.accId = transactionContentRequest.getAccId();
        this.transType = transactionContentRequest.getTransType();
        this.feeType = transactionContentRequest.getFeeType();
        this.fee = transactionContentRequest.getFee();
        this.amount = transactionContentRequest.getAmount();
        this.note = transactionContentRequest.getNote();
    }
}
