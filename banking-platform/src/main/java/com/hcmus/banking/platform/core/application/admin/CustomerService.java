package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.infrastructure.datasource.customer.CustomerRepository;
import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Transactional(readOnly = true)
    public Page<Customer> findAllBy(Pageable pageable) {
        return customerRepository.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Customer findById(Long id){
        return customerRepository.findById(id).orElse(Customer.ofEmpty());
    }

    @Transactional(readOnly = true)
    public Customer findByCode(String code){
        return customerRepository.findByCode(code).orElse(Customer.ofEmpty());
    }

    @Transactional
    public void create(Customer customer){
        customerRepository.save(customer);
    }

    @Transactional
    public void update(Customer customer){
        Customer oldCustomer = findByCode(customer.getCode());
        if (!oldCustomer.isEmpty()){
            oldCustomer.setFirstName(customer.getFirstName());
            oldCustomer.setLastName(customer.getLastName());
            oldCustomer.setBirthDate(customer.getBirthDate());
            oldCustomer.setGender(customer.getGender());
            oldCustomer.setPhone(customer.getPhone());
            oldCustomer.setAddress(customer.getAddress());
            customerRepository.save(oldCustomer);
        }
    }
}
