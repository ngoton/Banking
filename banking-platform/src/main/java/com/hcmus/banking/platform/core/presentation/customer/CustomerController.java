package com.hcmus.banking.platform.core.presentation.customer;

import com.hcmus.banking.platform.core.application.admin.CustomerService;
import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping
    public Page<CustomerResponse> findAllBy(Pageable pageable){
       Page<Customer> customers = customerService.findAllBy(pageable);
       return CustomerResponses.ofPage(customers, pageable);
    }

    @GetMapping("/{id}")
    public CustomerResponse findBy(@PathVariable Long id){
        Customer customer = customerService.findById(id);
        return new CustomerResponse(customer);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody CustomerRequest customerRequest){
        Customer customer = CustomerRequest.toCustomer(customerRequest);
        customerService.create(customer);
    }

    @PutMapping
    public void update(@RequestBody CustomerRequest customerRequest){
        Customer customer = CustomerRequest.toCustomer(customerRequest);
        customerService.update(customer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        customerService.delete(id);
    }
}
