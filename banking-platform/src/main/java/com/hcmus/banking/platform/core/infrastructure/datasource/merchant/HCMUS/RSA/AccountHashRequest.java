package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccountHashRequest {
    String clientKey;
    Long validity;
    String accId;
}
