package com.hcmus.banking.platform.core.presentation.customer;

import com.hcmus.banking.platform.core.application.admin.CustomerService;
import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    @GetMapping
    public Page<CustomerResponse> findAllBy(Pageable pageable){
       Page<Customer> customers=customerService.findAllBy(pageable);
       return CustomerResponses.ofPage(customers,pageable);
    }
}
