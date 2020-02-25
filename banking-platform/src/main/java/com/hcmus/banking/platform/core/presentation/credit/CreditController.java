package com.hcmus.banking.platform.core.presentation.credit;

import com.hcmus.banking.platform.core.application.admin.*;
import com.hcmus.banking.platform.core.presentation.advice.UserAdvice;
import com.hcmus.banking.platform.core.presentation.paymentTransaction.PaymentResponse;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/credits")
@UserAdvice.On
public class CreditController {
    private final CreditUseCaseService creditService;
    private final CustomerUseCaseService customerService;
    private final BeneficiaryUseCaseService beneficiaryService;
    private final PaymentUseCaseService paymentService;
    private final PaymentTransactionUseCaseService paymentTransactionService;

    @GetMapping
    public Page<CreditResponse> findAllBy(Pageable pageable){
        Page<Credit> credit = creditService.findAllBy(pageable);
        return CreditResponses.ofPage(credit, pageable);
    }

    @GetMapping("/{id}")
    public CreditResponse findBy(@PathVariable Long id){
        Credit credit = creditService.findById(id);
        return new CreditResponse(credit);
    }

    @GetMapping("/pending")
    public Page<CreditResponse> findPending(Pageable pageable){
        Page<Credit> credit = creditService.findPending(pageable);
        return CreditResponses.ofPage(credit, pageable);
    }

    @GetMapping("/customerCode/{code}")
    public Page<CreditResponse> findByCustomerCode(@PathVariable String code, Pageable pageable){
        Page<Credit> credits = creditService.findAllByCustomerCode(code, pageable);
        return CreditResponses.ofPage(credits, pageable);
    }
    @GetMapping("/customerId/{id}")
    public Page<CreditResponse> findByCustomerCode(@PathVariable Long id, Pageable pageable){
        Page<Credit> credits = creditService.findAllByCustomerId(id, pageable);
        return CreditResponses.ofPage(credits, pageable);
    }
    @PostMapping("/{id}/pay")
    public PaymentResponse payment(@Valid @RequestBody CreditPaymentRequest creditPaymentRequest, @PathVariable Long id, @ModelAttribute("user") User user){
        Credit credit = creditService.findById(id);
        if (credit.isEmpty()){
            throw new NotFoundException();
        }
        Customer customer = customerService.findByUserId(user.getId());
        Beneficiary beneficiary = beneficiaryService.findByCustomerAccount(credit.getAccount(), customer.getId());
        if (beneficiary.isEmpty()) {
            Beneficiary newBeneficiary = new Beneficiary(
                    String.format("%s %s", credit.getDebit().getCustomer().getInfo().getFirstName(), credit.getDebit().getCustomer().getInfo().getLastName()),
                    credit.getDebit().getCustomer().getInfo().getLastName(),
                    credit.getAccount(),
                    Beneficiary.BANK_NAME,
                    customer,
                    Created.ofEmpty());
            Payment newPayment = paymentService.findByAccount(credit.getAccount());
            if (newPayment.isEmpty()){
                throw new BankingServiceException("Beneficiary account not found");
            }

            newBeneficiary.setPayment(newPayment);
            beneficiaryService.create(newBeneficiary);

            beneficiary = newBeneficiary;
        }
        PaymentTransaction paymentTransaction = CreditPaymentRequest.toPaymentTransaction(creditPaymentRequest, credit, beneficiary);
        return new PaymentResponse(paymentTransactionService.payment(paymentTransaction, user), creditPaymentRequest.fee, credit.getDebit());
    }

    @PostMapping("/cancel")
    public void cancel(@Valid @RequestBody CancelRequest cancelRequest){
        creditService.cancel(cancelRequest.creditId, cancelRequest.content);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody CreditRequest creditRequest, @ModelAttribute("user") User user){
        Customer customer = customerService.findByUserId(user.getId());
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Credit credit = CreditRequest.toCredit(creditRequest, customer);
        creditService.create(credit);
    }

    @PutMapping
    public void update(@Valid @RequestBody CreditRequest creditRequest, @ModelAttribute("user") User user){
        Customer customer = customerService.findByUserId(user.getId());
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Credit credit = CreditRequest.toCredit(creditRequest, customer);
        creditService.update(credit, creditRequest.creditId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        creditService.delete(id);
    }

}
