package com.hcmus.banking.platform.core.infrastructure.datasource.customer;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.info.Info;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findAllBy(Pageable pageable);
    Optional<Customer> findById(Long id);
    Optional<Customer> findByCode(String code);
    Optional<Info> findInfoByCode(String code);
    Customer save(Customer customer);
    void delete(Customer customer);
}
