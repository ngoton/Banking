package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.core.application.admin.BeneficiaryUserCaseService;
import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.core.application.admin.PaymentTransactionUseCaseService;
import com.hcmus.banking.platform.core.application.admin.PaymentUseCaseService;
import com.hcmus.banking.platform.core.application.otp.OtpService;
import com.hcmus.banking.platform.core.presentation.advice.UserAdvice;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.otp.OTP;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.prefs.BackingStoreException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/paymentTransaction")
@UserAdvice.On
public class PaymentTransactionController {
    private final PaymentTransactionUseCaseService paymentTransactionService;
    private final BeneficiaryUserCaseService beneficiaryService;
    private final CustomerUseCaseService customerService;
    private final PaymentUseCaseService paymentService;
    private final OtpService otpService;

    @GetMapping
    public Page<PaymentTransactionResponse> findAllBy(Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllBy(pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentId(@PathVariable Long id, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPaymentId(id, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/historyBeneficiary/{id}")
    public Page<PaymentTransactionResponse> findAllByBeneficiary(@PathVariable Long id, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByBeneficiary(id, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/{id}")
    public PaymentTransactionResponse findById(@PathVariable Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        return new PaymentTransactionResponse(paymentTransaction);
    }

    @PostMapping("/payment")
    public PaymentResponse payment(@Valid @RequestBody PaymentTransactionRequest paymentTransactionRequest, @ModelAttribute("user") User user) {
        Customer customer = customerService.findByUserId(user.getId());
        Beneficiary beneficiary = beneficiaryService.findByAccount(paymentTransactionRequest.beneficiaryAccount);
        Payment payment = paymentService.findById(paymentTransactionRequest.paymentId);
        if (beneficiary.isEmpty()) {
            Beneficiary newBeneficiary = new Beneficiary(paymentTransactionRequest.name, paymentTransactionRequest.shortName, paymentTransactionRequest.beneficiaryAccount, paymentTransactionRequest.bankName, customer, Created.ofEmpty());
            beneficiaryService.create(newBeneficiary);
            PaymentTransaction paymentTransaction = paymentTransactionService.payment(paymentTransactionRequest.toPaymentTransaction(paymentTransactionRequest, newBeneficiary, payment), user);
            return new PaymentResponse(paymentTransaction,paymentTransactionRequest.fee);
        } else {
            PaymentTransaction paymentTransaction = paymentTransactionService.payment(paymentTransactionRequest.toPaymentTransaction(paymentTransactionRequest, beneficiary, payment), user);
            return new PaymentResponse(paymentTransaction,paymentTransactionRequest.fee);
        }
    }

    @PostMapping("/paymentVerify")
    public void paymentVerify(@Valid @RequestBody PaymentRequest paymentRequest, @ModelAttribute("user") User user) {
        Beneficiary beneficiary = beneficiaryService.findById(paymentRequest.beneficiaryId);
        Payment payment = paymentService.findById(paymentRequest.paymentId);
        if (beneficiary.isEmpty() || payment.isEmpty()) {
            throw new BankingServiceException("PaymentId or beneficiaryId is empty!!!");
        }
        OTP otp = otpService.findByEmailAndCode(user.getEmail(), paymentRequest.code);
        if (otp.isEmpty() || otp.isExpired()) {
            throw new BankingServiceException("OTP code is expired");
        }
        paymentTransactionService.paymentVerify(paymentRequest.toPaymentTransaction(paymentRequest, beneficiary, payment),paymentRequest.fee);

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        paymentTransactionService.delete(id);
    }
}
