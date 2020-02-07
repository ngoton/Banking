package com.hcmus.banking.platform.core.infrastructure.datasource.savingTransaction;

import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavingTransactionRepository extends JpaRepository<SavingTransaction, Long> {
    Page<SavingTransaction> findAllBy(Pageable pageable);

    Optional<SavingTransaction> findById(Long id);

    Page<SavingTransaction> findAllBySavingId(Long id, Pageable pageable);

    SavingTransaction save(SavingTransaction saving);

    void delete(SavingTransaction saving);
}
