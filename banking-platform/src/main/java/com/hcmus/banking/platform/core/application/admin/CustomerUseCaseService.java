package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.customer.CustomerService;
import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerUseCaseService {
    private final CustomerService customerService;

    @Transactional(readOnly = true)
    public Page<Customer> findAllBy(Pageable pageable) {
        return customerService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Customer findById(Long id){
        return customerService.findById(id);
    }

    @Transactional(readOnly = true)
    public Customer findByCode(String code){
        return customerService.findByCode(code);
    }

    @Transactional
    public void create(Customer customer){
        customerService.create(customer);
    }

    @Transactional
    public void update(Customer customer){
        customerService.update(customer);
    }

    @Transactional
    public void delete(Long id){
        customerService.delete(id);
    }
}
