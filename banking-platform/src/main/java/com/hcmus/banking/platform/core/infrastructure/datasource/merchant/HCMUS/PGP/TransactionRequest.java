package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.PGP;

import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
public class TransactionRequest {
    String STTTH;
    Long Time;
    String PartnerCode;
    String Hash;
    String STTTHAnother;
    BigDecimal Money;
    String Signature;
}
