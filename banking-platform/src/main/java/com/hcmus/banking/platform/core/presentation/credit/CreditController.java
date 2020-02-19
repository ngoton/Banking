package com.hcmus.banking.platform.core.presentation.credit;

import com.hcmus.banking.platform.core.application.admin.CreditUseCaseService;
import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.core.presentation.advice.UserAdvice;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/credits")
@UserAdvice.On
public class CreditController {
    private final CreditUseCaseService creditService;
    private final CustomerUseCaseService customerService;

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
    public List<CreditResponse> findByCustomerCode(@PathVariable String code){
        List<Credit> credits = creditService.findAllByCustomerCode(code);
        return CreditResponses.ofList(credits);
    }
    @GetMapping("/customerId/{id}")
    public List<CreditResponse> findByCustomerCode(@PathVariable Long id){
        List<Credit> credits = creditService.findAllByCustomerId(id);
        return CreditResponses.ofList(credits);
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
