package com.hcmus.banking.platform.core.application.customer;

import com.hcmus.banking.platform.core.infrastructure.datasource.customer.CustomerRepository;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
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
        Customer customer = customerRepository.findById(id).orElse(Customer.ofEmpty());
        if (customer.isEmpty()){
            throw new NotFoundException();
        }
        return customer;
    }

    public Customer findByCode(String code){
        Customer customer = customerRepository.findByCode(code).orElse(Customer.ofEmpty());
        if (customer.isEmpty()){
            throw new NotFoundException();
        }
        return customer;
    }

    public void create(Customer customer){
        customerRepository.save(customer);
    }

    public void update(Customer customer){
        Customer oldCustomer = findByCode(customer.getCode());
        oldCustomer.setFirstName(customer.getFirstName());
        oldCustomer.setLastName(customer.getLastName());
        oldCustomer.setBirthDate(customer.getBirthDate());
        oldCustomer.setGender(customer.getGender());
        oldCustomer.setPhone(customer.getPhone());
        oldCustomer.setAddress(customer.getAddress());
        customerRepository.save(oldCustomer);
    }

    public void delete(Long id){
        customerRepository.delete(findById(id));
    }
}
