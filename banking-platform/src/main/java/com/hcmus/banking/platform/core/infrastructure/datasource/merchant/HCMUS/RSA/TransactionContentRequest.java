package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionContentRequest {
    Long validity;
    String accId;
    String transType;
    String feeType;
    Double fee;
    Double amount;
    String note;
}
