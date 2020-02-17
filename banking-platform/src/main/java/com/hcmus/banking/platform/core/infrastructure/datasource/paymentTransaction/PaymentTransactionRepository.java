package com.hcmus.banking.platform.core.infrastructure.datasource.paymentTransaction;

import com.hcmus.banking.platform.domain.general.CreatedAt;
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
    Page<PaymentTransaction> findAllByBeneficiaryId(Long id,Pageable pageable);
    Page<PaymentTransaction> findAllByPartnerName(String name,Pageable pageable);
    PaymentTransaction save(PaymentTransaction paymentTransaction);
    void delete(PaymentTransaction paymentTransaction);

    Page<PaymentTransaction> findAllByPartnerNameAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqual(String partnerName, CreatedAt startDate, CreatedAt endDate, Pageable pageable);
    Page<PaymentTransaction> findAllByPartnerIsNotNullAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqual(CreatedAt startDate, CreatedAt endDate, Pageable pageable);
}
