package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.infrastructure.datasource.customer.CustomerRepository;
import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Page<Customer> findAllBy(Pageable pageable) {
        return customerRepository.findAllBy(pageable);
    }
}
