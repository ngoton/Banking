package com.hcmus.banking.platform.core.application.paymentTransaction;

import com.hcmus.banking.platform.core.infrastructure.datasource.paymentTransaction.PaymentTransactionRepository;
import com.hcmus.banking.platform.domain.general.CreatedAt;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PaymentTransactionService {
    private final PaymentTransactionRepository paymentTransactionRepository;

    public Page<PaymentTransaction> findAllBy(Pageable pageable) {
        return paymentTransactionRepository.findAllByOrderByIdDesc(pageable);
    }


    public Page<PaymentTransaction> findAllByPaymentId(Long id, Pageable pageable) {
        return paymentTransactionRepository.findAllByPaymentIdOrderByIdDesc(id, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentIdAndMoneyLessThan(Long id, Pageable pageable) {
        return paymentTransactionRepository.findAllByPaymentIdAndMoneyLessThanOrderByIdDesc(id, BigDecimal.ZERO, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentIdAndMoneyGreaterThan(Long id, Pageable pageable) {
        return paymentTransactionRepository.findAllByPaymentIdAndMoneyGreaterThanOrderByIdDesc(id, BigDecimal.ZERO, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyLessThan(Long id, Pageable pageable) {
        return paymentTransactionRepository.findAllByPaymentCustomerIdAndMoneyLessThanOrderByIdDesc(id, BigDecimal.ZERO, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyGreaterThan(Long id, Pageable pageable) {
        return paymentTransactionRepository.findAllByPaymentCustomerIdAndMoneyGreaterThanOrderByIdDesc(id, BigDecimal.ZERO, pageable);
    }

    public Page<PaymentTransaction> findAllByPartnerName(String name, Pageable pageable) {
        return paymentTransactionRepository.findAllByPartnerNameOrderByIdDesc(name, pageable);
    }

    public Page<PaymentTransaction> findAllByBeneficiary(Long id, Pageable pageable) {
        return paymentTransactionRepository.findAllByBeneficiaryIdOrderByIdDesc(id, pageable);
    }

    public PaymentTransaction findById(Long id) {
        return paymentTransactionRepository.findById(id).orElse(PaymentTransaction.ofEmpty());
    }

    public void create(PaymentTransaction paymentTransaction) {
        paymentTransactionRepository.save(paymentTransaction);
    }

    public void update(PaymentTransaction oldPaymentTransaction, PaymentTransaction paymentTransaction) {
        oldPaymentTransaction.setCode(paymentTransaction.getCode());
        paymentTransactionRepository.save(oldPaymentTransaction);
    }

    public void delete(PaymentTransaction paymentTransaction) {
        paymentTransactionRepository.delete(paymentTransaction);
    }

    public Page<PaymentTransaction> findAllByDate(CreatedAt startDate, CreatedAt endDate, Pageable pageable) {
        return paymentTransactionRepository.findAllByPartnerIsNotNullAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(startDate, endDate, pageable);
    }

    public Page<PaymentTransaction> findAllByPartner(String name, CreatedAt startDate, CreatedAt endDate, Pageable pageable) {
        return paymentTransactionRepository.findAllByPartnerNameAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(name, startDate, endDate, pageable);
    }

    public Page<PaymentTransaction> findAllByPartners(Pageable pageable) {
        return paymentTransactionRepository.findAllByPartnerIsNotNullOrderByIdDesc(pageable);
    }

    public Page<PaymentTransaction> findAllByCredit(Long id, Pageable pageable) {
        return paymentTransactionRepository.findAllByPaymentCustomerIdAndDebitIsNotNullOrderByIdDesc(id, pageable);
    }
}
