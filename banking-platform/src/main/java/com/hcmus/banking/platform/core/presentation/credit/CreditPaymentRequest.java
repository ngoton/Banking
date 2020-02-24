package com.hcmus.banking.platform.core.presentation.credit;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class CreditPaymentRequest {
    @NotNull(message = "Content is required")
    public String content;
    @NotNull
    public Boolean fee;

    public static PaymentTransaction toPaymentTransaction(CreditPaymentRequest creditPaymentRequest, Credit credit, Beneficiary beneficiary) {
        return new PaymentTransaction(
                creditPaymentRequest.content,
                credit.getMoney(),
                Created.ofEmpty(),
                credit.getCustomer().getPayment(),
                beneficiary);
    }
}
