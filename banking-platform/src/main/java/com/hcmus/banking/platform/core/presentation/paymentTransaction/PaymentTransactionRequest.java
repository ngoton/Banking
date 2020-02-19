package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class PaymentTransactionRequest {
    @NotNull(message = "Content is required")
    public String content;
    @NotNull(message = "Money is required")
    public BigDecimal money;
    @NotNull
    public Long paymentId;
    @NotNull(message = "Beneficiary account is required")
    public String beneficiaryAccount;

    @NotNull(message = "Name code is required")
    public String name;
    public String shortName;
    @NotNull(message = "Bank name code is required")
    public String bankName;
    @NotNull
    public Boolean fee;

    public static PaymentTransaction toPaymentTransaction(PaymentTransactionRequest paymentTransactionRequest, Beneficiary beneficiary, Payment payment) {
        return new PaymentTransaction(
                paymentTransactionRequest.content,
                paymentTransactionRequest.money,
                Created.ofEmpty(), payment, beneficiary);
    }
}
