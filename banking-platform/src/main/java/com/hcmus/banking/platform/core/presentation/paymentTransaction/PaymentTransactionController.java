package com.hcmus.banking.platform.core.presentation.paymentTransaction;

import com.hcmus.banking.platform.core.application.admin.*;
import com.hcmus.banking.platform.core.presentation.advice.UserAdvice;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/paymentTransaction")
@UserAdvice.On
public class PaymentTransactionController {
    private final PaymentTransactionUseCaseService paymentTransactionService;
    private final BeneficiaryUseCaseService beneficiaryService;
    private final CustomerUseCaseService customerService;
    private final PaymentUseCaseService paymentService;
    private final UserUseCaseService userService;

    @GetMapping
    public Page<PaymentTransactionResponse> findAllBy(Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllBy(pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentId(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPaymentId(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/paymentTransfer/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentIdAndMoneyLessThan(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPaymentIdAndMoneyLessThan(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/paymentCredit/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentCredit(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByCredit(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/paymentCredit/customer/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentCreditCustomer(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByCreditCustomer(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/paymentReceive/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentIdAndMoneyGreaterThan(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPaymentIdAndMoneyGreaterThan(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/paymentTransfer/customer/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentCustomerIdAndMoneyLessThan(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPaymentCustomerIdAndMoneyLessThan(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/paymentReceive/customer/{id}")
    public Page<PaymentTransactionResponse> findAllByPaymentCustomerIdAndMoneyGreaterThan(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPaymentCustomerIdAndMoneyGreaterThan(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/partner/{name}")
    public Page<PaymentTransactionResponse> findAllByPartnerName(@PathVariable String name, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPartnerName(name, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/history/partners")
    public Page<PaymentTransactionResponse> findAllByPartner(PartnerHistoryRequest partnerHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByPartner(partnerHistoryRequest.getPartnerName(), partnerHistoryRequest.getStartDate(), partnerHistoryRequest.getEndDate(), pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/historyBeneficiary/{id}")
    public Page<PaymentTransactionResponse> findAllByBeneficiary(@PathVariable Long id, PaymentHistoryRequest paymentHistoryRequest, Pageable pageable) {
        Page<PaymentTransaction> paymentTransactions = paymentTransactionService.findAllByBeneficiary(id, paymentHistoryRequest, pageable);
        return PaymentTransactionResponses.ofPage(paymentTransactions, pageable);
    }

    @GetMapping("/{id}")
    public PaymentTransactionResponse findById(@PathVariable Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        return new PaymentTransactionResponse(paymentTransaction);
    }

    @PostMapping("/deposit")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void deposit(@Valid @RequestBody DepositRequest depositRequest) {
        if (depositRequest.hasAccount()) {
            Payment payment = paymentService.findByAccount(depositRequest.account);
            if (payment.isEmpty()) {
                throw new BankingServiceException("Account not found");
            }
            if (payment.isLocked()) {
                throw new BankingServiceException("Account is locked");
            }
            paymentTransactionService.deposit(DepositRequest.toPaymentTransaction(depositRequest, payment));
        } else {
            if (!depositRequest.hasUsername()) {
                throw new BankingServiceException("Account not found");
            }

            User user = userService.findByUsername(depositRequest.username);
            if (user.isEmpty()) {
                throw new BankingServiceException("Account not found");
            }
            Customer customer = customerService.findByUserId(user.getId());
            if (customer.isEmpty()) {
                throw new BankingServiceException("Account not found");
            }
            List<Payment> payments = paymentService.findAllByCustomerId(customer.getId());
            if (payments.isEmpty()) {
                throw new BankingServiceException("Account not found");
            }
            Payment payment = payments.stream().findFirst().get();
            if (payment.isLocked()) {
                throw new BankingServiceException("Account is locked");
            }
            paymentTransactionService.deposit(DepositRequest.toPaymentTransaction(depositRequest, payment));

        }
    }

    @PostMapping("/payment")
    public PaymentResponse payment(@Valid @RequestBody PaymentTransactionRequest paymentTransactionRequest, @ModelAttribute("user") User user) {
        Customer customer = customerService.findByUserId(user.getId());
        Beneficiary beneficiary = beneficiaryService.findByCustomerAccount(paymentTransactionRequest.beneficiaryAccount, customer.getId());
        Payment payment = paymentService.findById(paymentTransactionRequest.paymentId);
        if (payment.isLocked()) {
            throw new BankingServiceException("Account is locked");
        }
        BigDecimal money = payment.getBalance().subtract(paymentTransactionRequest.money);
        if (money.signum() < 0) {
            throw new BankingServiceException("Not enough money");
        }

        if (beneficiary.isEmpty()) {
            Beneficiary newBeneficiary = new Beneficiary(paymentTransactionRequest.name, paymentTransactionRequest.shortName, paymentTransactionRequest.beneficiaryAccount, paymentTransactionRequest.bankName, customer, Created.ofEmpty());
            if (newBeneficiary.isInternal()) {
                Payment newPayment = paymentService.findByAccount(paymentTransactionRequest.beneficiaryAccount);
                if (newPayment.isEmpty()) {
                    throw new BankingServiceException("Beneficiary account not found");
                    //newPayment = new Payment(newBeneficiary.getAccount(), BigDecimal.ZERO, Created.ofEmpty());
                }

                newBeneficiary.setPayment(newPayment);
            }
            beneficiaryService.create(newBeneficiary);

            beneficiary = newBeneficiary;
        }
        Payment paymentBeneficiary = paymentService.findById(beneficiary.getPayment().getId());
        if (paymentBeneficiary.isLocked()) {
            throw new BankingServiceException("Account is locked");
        }
        PaymentTransaction paymentTransaction = paymentTransactionService.payment(paymentTransactionRequest.toPaymentTransaction(paymentTransactionRequest, beneficiary, payment), user);
        return new PaymentResponse(paymentTransaction, paymentTransactionRequest.fee);
    }

    @PostMapping("/payment/external")
    public PaymentResponse externalPayment(@Valid @RequestBody PaymentTransactionRequest paymentTransactionRequest, @ModelAttribute("user") User user) {
        Customer customer = customerService.findByUserId(user.getId());
        Beneficiary beneficiary = beneficiaryService.findByCustomerAccount(paymentTransactionRequest.beneficiaryAccount, customer.getId());
        Payment payment = paymentService.findById(paymentTransactionRequest.paymentId);
        if (payment.isLocked()) {
            throw new BankingServiceException("Account is locked");
        }
        BigDecimal money = payment.getBalance().subtract(paymentTransactionRequest.money);
        if (money.signum() < 0) {
            throw new BankingServiceException("Not enough money");
        }

        if (beneficiary.isEmpty()) {
            Beneficiary newBeneficiary = new Beneficiary(paymentTransactionRequest.name, paymentTransactionRequest.shortName, paymentTransactionRequest.beneficiaryAccount, paymentTransactionRequest.bankName, customer, Created.ofEmpty());
            beneficiaryService.create(newBeneficiary);

            beneficiary = newBeneficiary;
        }

        PaymentTransaction paymentTransaction = paymentTransactionService.payment(paymentTransactionRequest.toPaymentTransaction(paymentTransactionRequest, beneficiary, payment), user);
        return new PaymentResponse(paymentTransaction, paymentTransactionRequest.fee);
    }

    @PostMapping("/paymentVerify")
    public void paymentVerify(@Valid @RequestBody PaymentRequest paymentRequest, @ModelAttribute("user") User user) {
        Beneficiary beneficiary = beneficiaryService.findById(paymentRequest.beneficiaryId);
        Payment payment = paymentService.findById(paymentRequest.paymentId);
        if (payment.isLocked()) {
            throw new BankingServiceException("Account is locked");
        }
        if (beneficiary.isEmpty() || payment.isEmpty()) {
            throw new BankingServiceException("PaymentId or beneficiaryId is empty!!!");
        }

        paymentTransactionService.paymentVerify(paymentRequest.toPaymentTransaction(paymentRequest, beneficiary, payment), paymentRequest.fee, user.getEmail(), paymentRequest.code, paymentRequest.asDebit());

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        paymentTransactionService.delete(id);
    }
}
