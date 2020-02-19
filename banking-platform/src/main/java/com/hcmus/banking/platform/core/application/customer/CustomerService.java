package com.hcmus.banking.platform.core.application.customer;

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

    public Customer findById(Long id){
        return customerRepository.findById(id).orElse(Customer.ofEmpty());
    }

    public Customer findByCode(String code){
        return customerRepository.findByCode(code).orElse(Customer.ofEmpty());
    }

    public void create(Customer customer){
        customerRepository.save(customer);
    }

    public void update(Customer oldCustomer, Customer customer){
        oldCustomer.setCode(customer.getCode());
        customerRepository.save(oldCustomer);
    }

    public void delete(Customer customer){
        customerRepository.delete(customer);
    }

    public Customer findByUserId(Long id) {
        return customerRepository.findByInfoUserId(id).orElse(Customer.ofEmpty());
    }

    public Customer findByAccount(String account) {
        return customerRepository.findByPaymentAccount(account).orElse(Customer.ofEmpty());
    }
}
