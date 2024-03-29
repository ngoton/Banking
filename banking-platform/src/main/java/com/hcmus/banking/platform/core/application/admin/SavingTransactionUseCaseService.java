package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.customer.CustomerService;
import com.hcmus.banking.platform.core.application.saving.SavingService;
import com.hcmus.banking.platform.core.application.savingTransaction.SavingTransactionService;
import com.hcmus.banking.platform.core.utils.RandomUtils;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.saving.Saving;
import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SavingTransactionUseCaseService {
    private final SavingTransactionService savingTransactionService;
    private final SavingService savingService;
    private final CustomerService customerService;

    @Transactional(readOnly = true)
    public Page<SavingTransaction> findAllBy(Pageable pageable) {
        return savingTransactionService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public SavingTransaction findById(Long id) {
        SavingTransaction savingTransaction = savingTransactionService.findById(id);
        if (savingTransaction.isEmpty()) {
            throw new BankingServiceException("Transaction not found");
        }
        return savingTransaction;
    }

    @Transactional
    public void create(SavingTransaction savingTransaction) {
        savingTransaction.setCode(RandomUtils.generateTransactionCode());
        savingTransactionService.create(savingTransaction);

        Saving saving = savingTransaction.getSaving();
        saving.setBalance(saving.getBalance().add(savingTransaction.getMoney()));
        savingService.create(saving);
    }

    @Transactional
    public void delete(Long id) {
        SavingTransaction savingTransaction = savingTransactionService.findById(id);
        if (savingTransaction.isEmpty()) {
            throw new BankingServiceException("Transaction not found");
        }
        savingTransactionService.delete(savingTransaction);
    }

    @Transactional(readOnly = true)
    public Page<SavingTransaction> findAllBySavingId(Long id, Pageable pageable) {
        Saving saving = savingService.findById(id);
        if (saving.isEmpty()) {
            throw new BankingServiceException("Saving does not exist!!!");
        }
        return savingTransactionService.findAllBySavingId(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<SavingTransaction> findAllBySavingIdAnAndMoneyGreaterThan(Long id, Pageable pageable) {
        Saving saving = savingService.findById(id);
        if (saving.isEmpty()) {
            throw new BankingServiceException("Saving does not exist!!!");
        }
        return savingTransactionService.findAllBySavingIdAndMoneyGreaterThan(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<SavingTransaction> findAllBySavingIdAnAndMoneyLessThan(Long id, Pageable pageable) {
        Saving saving = savingService.findById(id);
        if (saving.isEmpty()) {
            throw new BankingServiceException("Saving does not exist!!!");
        }
        return savingTransactionService.findAllBySavingIdAndMoneyLessThan(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<SavingTransaction> findAllBySavingCustomerIdAndMoneyGreaterThan(Long id, Pageable pageable) {
        Customer customer = customerService.findById(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer does not exist!!!");
        }
        return savingTransactionService.findAllBySavingCustomerIdAndMoneyGreaterThan(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<SavingTransaction> findAllBySavingCustomerIdAndMoneyLessThan(Long id, Pageable pageable) {
        Customer customer = customerService.findById(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer does not exist!!!");
        }
        return savingTransactionService.findAllBySavingCustomerIdAndMoneyLessThan(id, pageable);
    }
}
