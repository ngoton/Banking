package com.hcmus.banking.platform.core.presentation.savingTransaction;

import com.hcmus.banking.platform.core.application.admin.SavingTransactionUseCaseService;
import com.hcmus.banking.platform.core.application.admin.SavingUseCaseService;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.saving.Saving;
import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/savingTransaction")
public class SavingTransactionController {
    private final SavingTransactionUseCaseService savingTransactionService;
    private final SavingUseCaseService savingService;

    @GetMapping
    public Page<SavingTransactionResponse> findAllBy(Pageable pageable) {
        Page<SavingTransaction> savingTransactions = savingTransactionService.findAllBy(pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }

    @GetMapping("/saving/{id}")
    public Page<SavingTransactionResponse> findAllByPaymentId(@PathVariable Long id, Pageable pageable) {
        Page<SavingTransaction> savingTransactions = savingTransactionService.findAllBySavingId(id, pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }

    @GetMapping("/history/savingTransfer/saving/{id}")
    public Page<SavingTransactionResponse> findAllBySavingIdAnAndMoneyGreaterThan(@PathVariable Long id, Pageable pageable) {
        Page<SavingTransaction> savingTransactions = savingTransactionService.findAllBySavingIdAnAndMoneyGreaterThan(id, pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }

    @GetMapping("/history/savingReceive/saving/{id}")
    public Page<SavingTransactionResponse> findAllBySavingIdAnAndMoneyLessThan(@PathVariable Long id, Pageable pageable) {
        Page<SavingTransaction> savingTransactions = savingTransactionService.findAllBySavingIdAnAndMoneyLessThan(id, pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }

    @GetMapping("/history/savingTransfer/customer/{id}")
    public Page<SavingTransactionResponse> findAllBySavingCustomerIdAndMoneyGreaterThan(@PathVariable Long id, Pageable pageable) {
        Page<SavingTransaction> savingTransactions = savingTransactionService.findAllBySavingCustomerIdAndMoneyGreaterThan(id, pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }

    @GetMapping("/history/savingReceive/customer/{id}")
    public Page<SavingTransactionResponse> findAllBySavingCustomerIdAndMoneyLessThan(@PathVariable Long id, Pageable pageable) {
        Page<SavingTransaction> savingTransactions = savingTransactionService.findAllBySavingCustomerIdAndMoneyLessThan(id, pageable);
        return SavingTransactionResponses.ofPage(savingTransactions, pageable);
    }

    @GetMapping("/{id}")
    public SavingTransactionResponse findBy(@PathVariable Long id) {
        SavingTransaction savingTransaction = savingTransactionService.findById(id);
        return new SavingTransactionResponse(savingTransaction);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void create(@Valid @RequestBody SavingTransactionRequest savingTransactionRequest) {
        Saving saving = savingService.findById(savingTransactionRequest.savingId);
        if (saving.isEmpty()) {
            throw new NotFoundException();
        }
        SavingTransaction savingTransaction = SavingTransactionRequest.toSavingTransaction(savingTransactionRequest, saving);
        savingTransactionService.create(savingTransaction);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        savingTransactionService.delete(id);
    }
}
