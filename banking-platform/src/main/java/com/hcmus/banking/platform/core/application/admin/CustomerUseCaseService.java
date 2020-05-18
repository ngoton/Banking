package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.customer.CustomerService;
import com.hcmus.banking.platform.core.application.info.InfoService;
import com.hcmus.banking.platform.core.application.user.UserService;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.info.Info;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerUseCaseService {
    private final CustomerService customerService;
    private final InfoService infoService;
    private final UserService userService;

    @Transactional(readOnly = true)
    public Page<Customer> findAllBy(Pageable pageable) {
        return customerService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Customer findById(Long id) {
        Customer customer = customerService.findById(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer not found");
        }
        return customer;
    }

    @Transactional(readOnly = true)
    public Customer findByCode(String code) {
        Customer customer = customerService.findByCode(code);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer not found");
        }
        return customer;
    }

    @Transactional
    public void create(Customer customer) {
        Customer byCode = customerService.findByCode(customer.getCode());
        if (!byCode.isEmpty()) {
            throw new BankingServiceException("Code is already exists");
        }
        User user = userService.findByUsername(customer.getCode());
        if (!user.isEmpty()) {
            throw new BankingServiceException("Code is already exists");
        }
        User user2 = userService.findByEmail(customer.getInfo().getUser().getEmail());
        if (!user2.isEmpty()){
            throw new BankingServiceException("Email is already exists");
        }

        customerService.create(customer);
    }

    @Transactional
    public void update(Customer customer) {
        Customer oldCustomer = customerService.findByCode(customer.getCode());
        if (oldCustomer.isEmpty()) {
            throw new BankingServiceException("Customer not found");
        }
        Info info = infoService.findByCustomerCode(customer.getCode());
        if (!info.isEmpty()) {
            infoService.update(info, customer.getInfo());
        }
        User user = userService.findByUsername(customer.getCode());
        if (!user.isEmpty()) {
            userService.update(user, customer.getInfo().getUser());
        }

        customerService.update(oldCustomer, customer);
    }

    @Transactional
    public void delete(Long id) {
        Customer customer = customerService.findById(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer not found");
        }
        customerService.delete(customer);
    }

    @Transactional(readOnly = true)
    public Customer findByUserId(Long id) {
        Customer customer = customerService.findByUserId(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer not found");
        }
        return customer;
    }

    @Transactional(readOnly = true)
    public Customer findByPaymentId(Long id) {
        Customer customer = customerService.findByPaymentId(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer not found");
        }
        return customer;
    }

    public Customer findByAccount(String account) {
        Customer customer = customerService.findByAccount(account);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer not found");
        }
        return customer;
    }
}
