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

    Page<PaymentTransaction> findAllByPaymentIdAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(Long id, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByBeneficiaryIdAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(Long id, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPartnerNameOrderByIdDesc(String name, Pageable pageable);

    PaymentTransaction save(PaymentTransaction paymentTransaction);

    void delete(PaymentTransaction paymentTransaction);

    Page<PaymentTransaction> findAllByPartnerNameAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(String partnerName, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPartnerIsNotNullAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPartnerIsNotNullOrderByIdDesc(Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentIdAndMoneyLessThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(Long paymentId, BigDecimal decimal, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentIdAndMoneyGreaterThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(Long paymentId, BigDecimal decimal, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyGreaterThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(Long id, BigDecimal decimal, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyLessThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(Long id, BigDecimal decimal, CreatedAt startDate, CreatedAt endDate, Pageable pageable);

    Page<PaymentTransaction> findAllByPaymentCustomerIdAndDebitIsNotNullAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(Long id, CreatedAt startDate, CreatedAt endDate, Pageable pageable);
}
