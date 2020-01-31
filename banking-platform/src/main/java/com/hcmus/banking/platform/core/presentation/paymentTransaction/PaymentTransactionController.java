package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.core.application.admin.PaymentTransactionUserCaseService;
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
    private final PaymentTransactionUserCaseService PaymentTransactionService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<PaymentTransactionResponse> findAllBy(Pageable pageable){
        Page<PaymentTransaction> paymentTransactions = PaymentTransactionService.findAllBy(pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }
    @GetMapping("/history/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<PaymentTransactionResponse> findAllByPaymentId(@PathVariable Long id, Pageable pageable){
        Page<PaymentTransaction> paymentTransactions = PaymentTransactionService.findAllByPaymentId(id,pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }
    @GetMapping("/historyBeneficiary/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<PaymentTransactionResponse> findAllByBeneficiary(@PathVariable Long id, Pageable pageable){
        Page<PaymentTransaction> paymentTransactions = PaymentTransactionService.findAllByBeneficiary(id,pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public PaymentTransactionResponse findBy(@PathVariable Long id){
        PaymentTransaction paymentTransaction = PaymentTransactionService.findById(id);
        return new PaymentTransactionResponse(paymentTransaction);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        PaymentTransactionService.delete(id);
    }
}
