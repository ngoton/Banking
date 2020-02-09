package com.hcmus.banking.platform.core.application.savingTransaction;

import com.hcmus.banking.platform.core.infrastructure.datasource.savingTransaction.SavingTransactionRepository;
import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingTransactionService {
    private final SavingTransactionRepository savingTransactionRepository;

    public Page<SavingTransaction> findAllBy(Pageable pageable) {
        return savingTransactionRepository.findAllBy(pageable);
    }

    public SavingTransaction findById(Long id) {
        return savingTransactionRepository.findById(id).orElse(SavingTransaction.ofEmpty());
    }

    public Page<SavingTransaction> findAllBySavingId(Long id,Pageable pageable) {
        return savingTransactionRepository.findAllBySavingId(id,pageable);
    }

    public void create(SavingTransaction savingTransaction) {
        savingTransactionRepository.save(savingTransaction);
    }

    public void update(SavingTransaction oldSaving, SavingTransaction saving) {
        oldSaving.setContent(saving.getContent());
        savingTransactionRepository.save(oldSaving);
    }

    public void delete(SavingTransaction saving) {
        savingTransactionRepository.delete(saving);
    }
}
