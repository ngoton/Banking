package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
public class DepositRequest {
    @NotNull(message = "Money account is required")
    public BigDecimal money;
    @NotNull(message = "Content is required")
    public String content;

    public String account;
    public String username;

    public static PaymentTransaction toPaymentTransaction(DepositRequest depositRequest, Payment payment) {
        return new PaymentTransaction(
                depositRequest.content,
                depositRequest.money,
                Created.ofEmpty(), payment);
    }

    public boolean hasAccount(){
        return !account.isEmpty();
    }

    public boolean hasUsername(){
        return !username.isEmpty();
    }
}
