package com.hcmus.banking.platform.core.infrastructure.datasource.paymentTransaction;

import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    Page<PaymentTransaction> findAllBy(Pageable pageable);
    Optional<PaymentTransaction> findById(Long id);
    Page<PaymentTransaction> findAllByPaymentId(Long id,Pageable pageable);
    Page<PaymentTransaction> findAllByBeneficiary(Long id,Pageable pageable);
    PaymentTransaction save(PaymentTransaction paymentTransaction);
    void delete(PaymentTransaction paymentTransaction);
}
