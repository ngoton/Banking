package com.hcmus.banking.platform.core.presentation.payment;

import com.hcmus.banking.platform.core.application.admin.PaymentUseCaseService;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/payments")
public class PaymentController {
    private final PaymentUseCaseService paymentService;

    @GetMapping
    public Page<PaymentResponse> findAllBy(Pageable pageable){
        Page<Payment> payment = paymentService.findAllBy(pageable);
        return PaymentResponses.ofPage(payment, pageable);
    }

    @GetMapping("/{id}")
    public PaymentResponse findBy(@PathVariable Long id){
        Payment payment = paymentService.findById(id);
        return new PaymentResponse(payment);
    }
    @GetMapping("/customerCode/{code}")
    public List<PaymentResponse> findByCustomerCode(@PathVariable String code){
        List<Payment> payments = paymentService.findAllByCustomerCode(code);
        return PaymentResponses.ofList(payments);
    }
    @GetMapping("/customerId/{id}")
    public List<PaymentResponse> findByCustomerCode(@PathVariable Long id){
        List<Payment> payments = paymentService.findAllByCustomerId(id);
        return PaymentResponses.ofList(payments);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void create(@Valid @RequestBody PaymentRequest paymentRequest){
        Payment payment = PaymentRequest.toPayment(paymentRequest);
        paymentService.create(payment);
    }

    @PostMapping("/lock")
    public void lockPayment(@Valid @RequestBody LockPaymentRequest paymentRequest){
        paymentService.lockPayment(paymentRequest);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void update(@Valid @RequestBody PaymentRequest paymentRequest){
        Payment payment = PaymentRequest.toPayment(paymentRequest);
        paymentService.update(payment);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        paymentService.delete(id);
    }

}
