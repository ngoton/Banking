package com.hcmus.banking.platform.api.presentation.secure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.core.application.admin.PaymentTransactionUseCaseService;
import com.hcmus.banking.platform.core.application.admin.PaymentUseCaseService;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.partner.Partner;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController("ApiTransactionController")
@RequiredArgsConstructor
@RequestMapping("/api/v1/transactions")
public class TransactionController {
    private final PaymentUseCaseService paymentService;
    private final PaymentTransactionUseCaseService paymentTransactionService;

    @PostMapping
    public TransactionResponse transaction(@ModelAttribute("request") Map<String, Object> request, @ModelAttribute("partner") Partner partner) {
        ObjectMapper objectMapper = new ObjectMapper();
        ContentRequest contentRequest = objectMapper.convertValue(request.get("content"), ContentRequest.class);
        Payment payment = paymentService.findByAccount(contentRequest.getAccount());
        if (payment.isLocked()) {
            throw new BankingServiceException("Account is locked");
        }
        PaymentTransaction paymentTransaction = new PaymentTransaction(contentRequest.getContent(), contentRequest.getAmount(), Created.ofEmpty(), payment);
        paymentTransactionService.externalPayment(paymentTransaction, partner);
        return TransactionResponse.of(paymentTransaction);
    }
}
