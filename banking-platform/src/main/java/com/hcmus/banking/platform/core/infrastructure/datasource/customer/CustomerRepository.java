package com.hcmus.banking.platform.core.infrastructure.datasource.customer;

import com.hcmus.banking.platform.domain.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findAllBy(Pageable pageable);
}
