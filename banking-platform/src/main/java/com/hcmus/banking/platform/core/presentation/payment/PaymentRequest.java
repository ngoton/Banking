package com.hcmus.banking.platform.core.presentation.payment;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
public class PaymentRequest {
    @NotNull(message = "Account is required")
    public String account;
    public BigDecimal balance;

    public static Payment toPayment(PaymentRequest paymentRequest) {
        return new Payment(paymentRequest.account, paymentRequest.balance, Created.ofEmpty());
    }
}
