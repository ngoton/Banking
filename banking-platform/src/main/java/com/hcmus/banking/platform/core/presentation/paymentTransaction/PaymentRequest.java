package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
public class PaymentRequest {
    @NotNull(message = "Money account is required")
    public BigDecimal money;
    @NotNull(message = "Content is required")
    public String content;
    @NotNull
    public Long paymentId;
    @NotNull
    public Long beneficiaryId;
    @NotNull(message = "OTP code is required")
    public String code;
    @NotNull
    public Boolean fee;

    public static PaymentTransaction toPaymentTransaction(PaymentRequest paymentTransactionRequest, Beneficiary beneficiary, Payment payment) {
        return new PaymentTransaction(
                paymentTransactionRequest.content,
                paymentTransactionRequest.money,
                Created.ofEmpty(), payment, beneficiary);
    }
}
