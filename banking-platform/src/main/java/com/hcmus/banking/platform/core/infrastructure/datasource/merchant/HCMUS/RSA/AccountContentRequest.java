package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccountContentRequest {
    Long validity;
    String accId;
}
