package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.payment.PaymentService;
import com.hcmus.banking.platform.core.presentation.payment.LockPaymentRequest;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentUseCaseService {
    private final PaymentService paymentService;

    @Transactional(readOnly = true)
    public Page<Payment> findAllBy(Pageable pageable) {
        return paymentService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Payment findById(Long id) {
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Payment not found");
        }
        return payment;
    }

    @Transactional(readOnly = true)
    public List<Payment> findAllByCustomerCode(String code) {
        List<Payment> payments = paymentService.findAllByCustomerCode(code);
        return payments;
    }

    @Transactional(readOnly = true)
    public Payment findByAccount(String code) {
        Payment payment = paymentService.findByAccount(code);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Account not found");
        }
        return payment;
    }

    @Transactional(readOnly = true)
    public List<Payment> findAllByCustomerId(Long id) {
        List<Payment> payments = paymentService.findAllByCustomerId(id);
        return payments;
    }

    @Transactional
    public void create(Payment payment) {
        Payment oldPayment = paymentService.findByAccount(payment.getAccount());
        if (!oldPayment.isEmpty()) {
            throw new BankingServiceException("Payment account is already exists");
        }
        paymentService.create(payment);
    }

    @Transactional
    public void update(Payment payment) {
        Payment oldPayment = paymentService.findByAccount(payment.getAccount());
        if (oldPayment.isEmpty()) {
            throw new BankingServiceException("Payment not found");
        }
        paymentService.update(oldPayment, payment);
    }

    @Transactional
    public void delete(Long id) {
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Payment not found");
        }
        paymentService.delete(payment);
    }

    @Transactional
    public void lockPayment(LockPaymentRequest paymentRequest) {
        Payment payment = paymentService.findByAccount(paymentRequest.account);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Payment not found");
        }
        payment.setStatus(paymentRequest.status);
        paymentService.create(payment);
    }
}
