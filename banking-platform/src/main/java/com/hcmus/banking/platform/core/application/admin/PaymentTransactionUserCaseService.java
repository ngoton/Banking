package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.beneficiary.BeneficiaryService;
import com.hcmus.banking.platform.core.application.payment.PaymentService;
import com.hcmus.banking.platform.core.application.paymentTransaction.PaymentTransactionService;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentTransactionUserCaseService {
    private final PaymentTransactionService paymentTransactionService;
    private final PaymentService paymentService;
    private final BeneficiaryService beneficiaryService;

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllBy(Pageable pageable) {
        return paymentTransactionService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public PaymentTransaction findById(Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        if (paymentTransaction.isEmpty()) {
            throw new NotFoundException();
        }
        return paymentTransaction;
    }

    @Transactional
    public void delete(Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        if (paymentTransaction.isEmpty()) {
            throw new NotFoundException();
        }
        paymentTransactionService.delete(paymentTransaction);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByPaymentId(Long id, Pageable pageable) {
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Payment does not exist!!!");
        }
        return paymentTransactionService.findAllByPaymentId(id, pageable);
    }
    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByBeneficiary(Long id, Pageable pageable) {
        Beneficiary beneficiary=beneficiaryService.findById(id);
        if (beneficiary.isEmpty()) {
            throw new BankingServiceException("Beneficiary does not exist!!!");
        }
        return paymentTransactionService.findAllByPaymentId(id, pageable);
    }
}
