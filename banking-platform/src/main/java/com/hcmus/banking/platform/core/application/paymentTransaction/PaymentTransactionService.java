package com.hcmus.banking.platform.core.application.paymentTransaction;

import com.hcmus.banking.platform.core.infrastructure.datasource.paymentTransaction.PaymentTransactionRepository;
import com.hcmus.banking.platform.core.presentation.paymentTransaction.PaymentHistoryRequest;
import com.hcmus.banking.platform.domain.general.CreatedAt;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PaymentTransactionService {
    private final PaymentTransactionRepository paymentTransactionRepository;

    public Page<PaymentTransaction> findAllBy(Pageable pageable) {
        return paymentTransactionRepository.findAllByOrderByIdDesc(pageable);
    }

    private CreatedAt getStartDate(PaymentHistoryRequest paymentHistoryRequest) {
        LocalDate startDate = LocalDate.now().minusDays(30);

        if (Objects.nonNull(paymentHistoryRequest.getStartDate())) {
            startDate = paymentHistoryRequest.getStartDate();
        }
        return new CreatedAt(startDate.atStartOfDay());
    }

    private CreatedAt getEndDate(PaymentHistoryRequest paymentHistoryRequest) {
        LocalDate endDate = LocalDate.now();

        if (Objects.nonNull(paymentHistoryRequest.getEndDate())) {
            endDate = paymentHistoryRequest.getEndDate();
        }
        return new CreatedAt(endDate.plusDays(1).atStartOfDay());
    }

    public Page<PaymentTransaction> findAllByPaymentId(Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        CreatedAt startDate = getStartDate(paymentHistoryRequest);
        CreatedAt endDate = getEndDate(paymentHistoryRequest);
        return paymentTransactionRepository.findAllByPaymentIdAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(id, startDate, endDate, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentIdAndMoneyLessThan(Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        CreatedAt startDate = getStartDate(paymentHistoryRequest);
        CreatedAt endDate = getEndDate(paymentHistoryRequest);
        return paymentTransactionRepository.findAllByPaymentIdAndMoneyLessThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(id, BigDecimal.ZERO, startDate, endDate, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentIdAndMoneyGreaterThan(Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        CreatedAt startDate = getStartDate(paymentHistoryRequest);
        CreatedAt endDate = getEndDate(paymentHistoryRequest);
        return paymentTransactionRepository.findAllByPaymentIdAndMoneyGreaterThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(id, BigDecimal.ZERO, startDate, endDate, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyLessThan(Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        CreatedAt startDate = getStartDate(paymentHistoryRequest);
        CreatedAt endDate = getEndDate(paymentHistoryRequest);
        return paymentTransactionRepository.findAllByPaymentCustomerIdAndMoneyLessThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(id, BigDecimal.ZERO, startDate, endDate, pageable);
    }

    public Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyGreaterThan(Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        CreatedAt startDate = getStartDate(paymentHistoryRequest);
        CreatedAt endDate = getEndDate(paymentHistoryRequest);
        return paymentTransactionRepository.findAllByPaymentCustomerIdAndMoneyGreaterThanAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(id, BigDecimal.ZERO, startDate, endDate, pageable);
    }

    public Page<PaymentTransaction> findAllByPartnerName(String name, Pageable pageable) {
        return paymentTransactionRepository.findAllByPartnerNameOrderByIdDesc(name, pageable);
    }

    public Page<PaymentTransaction> findAllByBeneficiary(Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        CreatedAt startDate = getStartDate(paymentHistoryRequest);
        CreatedAt endDate = getEndDate(paymentHistoryRequest);
        return paymentTransactionRepository.findAllByBeneficiaryIdAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(id, startDate, endDate, pageable);
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

    public Page<PaymentTransaction> findAllByCredit(Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        CreatedAt startDate = getStartDate(paymentHistoryRequest);
        CreatedAt endDate = getEndDate(paymentHistoryRequest);
        return paymentTransactionRepository.findAllByPaymentCustomerIdAndDebitIsNotNullAndCreatedCreatedAtGreaterThanEqualAndCreatedCreatedAtLessThanEqualOrderByIdDesc(id, startDate, endDate, pageable);
    }
}
