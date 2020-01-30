package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class PaymentTransactionResponses {
    final List<PaymentTransactionResponse> paymentTransactionReponses;

    public static Page<PaymentTransactionResponse> ofPage(Page<PaymentTransaction> PaymentTransactionPage, Pageable pageable) {
        List<PaymentTransaction> paymentTransactions = PaymentTransactionPage.getContent();
        long total = PaymentTransactionPage.getTotalElements();
        List<PaymentTransactionResponse> responses = paymentTransactions.stream()
                .map(paymentTransaction -> new PaymentTransactionResponse(paymentTransaction))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }
}
