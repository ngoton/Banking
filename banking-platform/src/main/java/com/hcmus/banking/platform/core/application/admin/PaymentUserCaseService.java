package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.payment.PaymentService;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentUserCaseService {
    private final PaymentService paymentService;

    @Transactional(readOnly = true)
    public Page<Payment> findAllBy(Pageable pageable) {
        return paymentService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Payment findById(Long id){
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()){
            throw new NotFoundException();
        }
        return payment;
    }

    @Transactional(readOnly = true)
    public Payment findByAccount(String code){
        Payment payment = paymentService.findByAccount(code);
        if (payment.isEmpty()){
            throw new NotFoundException();
        }
        return payment;
    }

    @Transactional
    public void create(Payment payment){
        paymentService.create(payment);
    }

    @Transactional
    public void update(Payment payment){
        Payment oldStaff = paymentService.findByAccount(payment.getAccount());
        if (oldStaff.isEmpty()){
            throw new NotFoundException();
        }
        paymentService.update(oldStaff, payment);
    }

    @Transactional
    public void delete(Long id){
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()){
            throw new NotFoundException();
        }
        paymentService.delete(payment);
    }
}
