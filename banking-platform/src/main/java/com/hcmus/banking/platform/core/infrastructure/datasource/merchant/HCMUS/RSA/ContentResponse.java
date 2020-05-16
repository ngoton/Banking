package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ContentResponse {
    String transactionRef;
    LocalDateTime createdDate;
    String content;
    String feeType;
    BigDecimal fee;
    String status;
    String receiveAccount;
}
