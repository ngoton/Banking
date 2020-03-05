package com.hcmus.banking.platform.core.infrastructure.datasource.paymentTransaction;

import com.hcmus.banking.platform.domain.general.CreatedAt;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    Page<PaymentTransaction> findAllByOrderByIdDesc(Pageable pageable);

    Optional<PaymentTransaction> findById(Long id);

    Page<PaymentTransaction> findAllByPaymentIdOrderByIdDesc(Long id, Pageable pageable);

    Page<PaymentTransaction> findAllByBeneficiaryIdOrderByIdDesc(Long id, Pageable pageable);

    Page<PaymentTransaction> findAllByPartnerNameOrderByIdDesc(String name, Pageable pageable);

    PaymentTransaction save(PaymentTransaction paymentTransaction);

    void delete(PaymentTransaction paymentTransaction);

    Page<PaymentTransaction> findAllByPartnerNameAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(String partnerName, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPartnerIsNotNullAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPartnerIsNotNullOrderByIdDesc(Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentIdAndMoneyLessThanOrderByIdDesc(Long paymentId, BigDecimal decimal, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentIdAndMoneyGreaterThanOrderByIdDesc(Long paymentId, BigDecimal decimal, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyGreaterThanOrderByIdDesc(Long id, BigDecimal decimal, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyLessThanOrderByIdDesc(Long id, BigDecimal decimal, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentCustomerIdAndDebitIsNotNullOrderByIdDesc(Long id, Pageable pageable);
}
