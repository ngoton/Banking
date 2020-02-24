package com.hcmus.banking.platform.core.presentation.debit;

import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.core.application.admin.DebitUseCaseService;
import com.hcmus.banking.platform.core.presentation.advice.UserAdvice;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.debit.Debit;
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
@RequestMapping("/internal/debits")
@UserAdvice.On
public class DebitController {
    private final DebitUseCaseService debitService;
    private final CustomerUseCaseService customerService;

    @GetMapping
    public Page<DebitResponse> findAllBy(Pageable pageable){
        Page<Debit> debit = debitService.findAllBy(pageable);
        return DebitResponses.ofPage(debit, pageable);
    }

    @GetMapping("/{id}")
    public DebitResponse findBy(@PathVariable Long id){
        Debit debit = debitService.findById(id);
        return new DebitResponse(debit);
    }
    @GetMapping("/customerCode/{code}")
    public Page<DebitResponse> findByCustomerCode(@PathVariable String code, Pageable pageable){
        Page<Debit> debits = debitService.findAllByCustomerCode(code, pageable);
        return DebitResponses.ofPage(debits, pageable);
    }
    @GetMapping("/customerId/{id}")
    public Page<DebitResponse> findByCustomerCode(@PathVariable Long id, Pageable pageable){
        Page<Debit> debits = debitService.findAllByCustomerId(id, pageable);
        return DebitResponses.ofPage(debits, pageable);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody DebitRequest debitRequest, @ModelAttribute("user") User user){
        Customer customer = customerService.findByUserId(user.getId());
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Debit debit = DebitRequest.toDebit(debitRequest, customer);
        debitService.create(debit);
    }

    @PutMapping
    public void update(@Valid @RequestBody DebitRequest debitRequest, @ModelAttribute("user") User user){
        Customer customer = customerService.findByUserId(user.getId());
        if (customer.isEmpty()) {
            throw new NotFoundException();
        }
        Debit debit = DebitRequest.toDebit(debitRequest, customer);
        debitService.update(debit, debitRequest.debitId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        debitService.delete(id);
    }

}
