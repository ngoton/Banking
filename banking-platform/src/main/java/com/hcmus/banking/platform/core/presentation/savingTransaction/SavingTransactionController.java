package com.hcmus.banking.platform.core.presentation.savingTransaction;

import com.hcmus.banking.platform.core.application.admin.SavingTransactionUserCaseService;
import com.hcmus.banking.platform.core.presentation.saving.SavingResponse;
import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/savingTransaction")
public class SavingTransactionController {
    private final SavingTransactionUserCaseService SavingTransactionService;
    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<SavingTransactionResponse> findAllBy(Pageable pageable){
        Page<SavingTransaction> savingTransactions = SavingTransactionService.findAllBy(pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }
    @GetMapping("/saving/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<SavingTransactionResponse> findAllByPaymentId(@PathVariable Long id, Pageable pageable){
        Page<SavingTransaction> savingTransactions = SavingTransactionService.findAllBySavingId(id,pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public SavingTransactionResponse findBy(@PathVariable Long id){
        SavingTransaction savingTransaction  = SavingTransactionService.findById(id);
        return new SavingTransactionResponse(savingTransaction);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        SavingTransactionService.delete(id);
    }
}
