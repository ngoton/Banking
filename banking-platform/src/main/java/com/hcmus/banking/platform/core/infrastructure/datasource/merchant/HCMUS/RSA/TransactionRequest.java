package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionRequest {
    String hash;
    TransactionContentRequest content;
    String sign;
}
