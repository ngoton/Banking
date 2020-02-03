package com.hcmus.banking.platform.core.presentation.payment;


import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class PaymentResponses {
    final List<PaymentResponse> paymentResponses;

    public static Page<PaymentResponse> ofPage(Page<Payment> paymentPage, Pageable pageable) {
        List<Payment> payments = paymentPage.getContent();
        long total = paymentPage.getTotalElements();
        List<PaymentResponse> responses = payments.stream()
                .map(payment -> new PaymentResponse(payment))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }

    public static List<PaymentResponse> ofList(List<Payment> payments) {
        List<PaymentResponse> responses = payments.stream()
                .map(payment -> new PaymentResponse(payment))
                .collect(Collectors.toList());
        return responses;
    }

}
