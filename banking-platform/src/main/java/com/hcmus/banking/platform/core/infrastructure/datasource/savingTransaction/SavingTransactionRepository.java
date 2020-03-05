package com.hcmus.banking.platform.core.infrastructure.datasource.savingTransaction;

import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface SavingTransactionRepository extends JpaRepository<SavingTransaction, Long> {
    Page<SavingTransaction> findAllByOrderByIdDesc(Pageable pageable);

    Optional<SavingTransaction> findById(Long id);

    Page<SavingTransaction> findAllBySavingIdOrderByIdDesc(Long id, Pageable pageable);

    Page<SavingTransaction> findAllBySavingIdAndMoneyGreaterThanOrderByIdDesc(Long id, BigDecimal money, Pageable pageable);

    Page<SavingTransaction> findAllBySavingIdAndMoneyLessThanOrderByIdDesc(Long id, BigDecimal money, Pageable pageable);

    Page<SavingTransaction> findAllBySavingCustomerIdAndMoneyLessThanOrderByIdDesc(Long id, BigDecimal money, Pageable pageable);

    Page<SavingTransaction> findAllBySavingCustomerIdAndMoneyGreaterThanOrderByIdDesc(Long id, BigDecimal money, Pageable pageable);

    SavingTransaction save(SavingTransaction saving);

    void delete(SavingTransaction saving);
}
