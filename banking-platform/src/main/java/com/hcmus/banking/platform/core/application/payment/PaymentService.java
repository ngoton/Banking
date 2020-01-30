package com.hcmus.banking.platform.core.application.payment;

import com.hcmus.banking.platform.core.infrastructure.datasource.payment.PaymentRepository;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public Page<Payment> findAllBy(Pageable pageable) {
        return paymentRepository.findAllBy(pageable);
    }

    public Payment findById(Long id) {
        return paymentRepository.findById(id).orElse(Payment.ofEmpty());
    }

    public Payment findByAccount(String account) {
        return paymentRepository.findByAccount(account).orElse(Payment.ofEmpty());
    }

    public void create(Payment payment) {
        paymentRepository.save(payment);
    }

    public void update(Payment oldPayment, Payment payment) {
        oldPayment.setBalance(payment.getBalance());
        paymentRepository.save(oldPayment);
    }

    public void delete(Payment payment) {
        paymentRepository.delete(payment);
    }
}
