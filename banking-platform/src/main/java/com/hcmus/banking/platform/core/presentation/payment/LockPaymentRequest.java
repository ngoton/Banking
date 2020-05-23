package com.hcmus.banking.platform.core.presentation.payment;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
public class LockPaymentRequest {
    @NotNull(message = "Account is required")
    public String account;
    public Integer status;
}
