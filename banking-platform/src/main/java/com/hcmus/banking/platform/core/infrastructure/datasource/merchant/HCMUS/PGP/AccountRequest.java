package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.PGP;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AccountRequest {
    String STTTH;
    Long Time;
    String PartnerCode;
    String Hash;
}
