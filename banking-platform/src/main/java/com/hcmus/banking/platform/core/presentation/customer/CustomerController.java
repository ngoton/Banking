package com.hcmus.banking.platform.core.presentation.customer;

import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/internal/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerUseCaseService customerService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<CustomerResponse> findAllBy(Pageable pageable){
       Page<Customer> customers = customerService.findAllBy(pageable);
       return CustomerResponses.ofPage(customers, pageable);
    }

    @GetMapping("/{id}")
    public CustomerResponse findBy(@PathVariable Long id){
        Customer customer = customerService.findById(id);
        return new CustomerResponse(customer);
    }

    @GetMapping("/user/{id}")
    public CustomerResponse findByUser(@PathVariable Long id){
        Customer customer = customerService.findByUserId(id);
        return new CustomerResponse(customer);
    }

    @GetMapping("/payment/{account}")
    public CustomerResponse findByAccount(@PathVariable String account){
        Customer customer = customerService.findByAccount(account);
        return new CustomerResponse(customer);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void create(@Valid @RequestBody CustomerRequest customerRequest){
        Customer customer = CustomerRequest.toCustomer(customerRequest);
        customerService.create(customer);
    }

    @PutMapping
    public void update(@Valid @RequestBody CustomerRequest customerRequest){
        Customer customer = CustomerRequest.toCustomer(customerRequest);
        customerService.update(customer);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        customerService.delete(id);
    }
}
