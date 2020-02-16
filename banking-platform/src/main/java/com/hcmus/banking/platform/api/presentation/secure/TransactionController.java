package com.hcmus.banking.platform.api.presentation.secure;

import com.hcmus.banking.platform.core.application.admin.PaymentTransactionUseCaseService;
import com.hcmus.banking.platform.core.application.admin.PaymentUseCaseService;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.partner.Partner;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController("ApiTransactionController")
@RequiredArgsConstructor
@RequestMapping("/api/v1/transactions")
public class TransactionController {
    private final PaymentUseCaseService paymentService;
    private final PaymentTransactionUseCaseService paymentTransactionService;

    @PostMapping
    public TransactionResponse transaction(@Valid @RequestBody TransactionRequest transactionRequest, @ModelAttribute("partner") Partner partner){
        Payment payment = paymentService.findByAccount(transactionRequest.getContent().getAccount());
        PaymentTransaction paymentTransaction = new PaymentTransaction(transactionRequest.getContent().getContent(), transactionRequest.getContent().getAmount(), Created.ofEmpty(), payment);
        paymentTransactionService.externalPayment(paymentTransaction, partner);
        return TransactionResponse.of(paymentTransaction);
    }
}
