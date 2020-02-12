package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.core.application.admin.PaymentTransactionUseCaseService;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/paymentTransaction")
public class PaymentTransactionController {
    private final PaymentTransactionUseCaseService paymentTransactionService;

    @GetMapping
    public Page<PaymentTransactionResponse> findAllBy(Pageable pageable){
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllBy(pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }
    @GetMapping("/history/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentId(@PathVariable Long id, Pageable pageable){
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPaymentId(id,pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }
    @GetMapping("/historyBeneficiary/{id}")
    public Page<PaymentTransactionResponse> findAllByBeneficiary(@PathVariable Long id, Pageable pageable){
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByBeneficiary(id,pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/{id}")
    public PaymentTransactionResponse findBy(@PathVariable Long id){
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        return new PaymentTransactionResponse(paymentTransaction);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        paymentTransactionService.delete(id);
    }
}
