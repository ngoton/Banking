package com.hcmus.banking.platform.core.infrastructure.datasource.payment;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.staff.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Page<Payment> findAllBy(Pageable pageable);

    Optional<Payment> findById(Long id);

    Optional<Payment> findByAccount(String account);

    List<Payment> findAllByCustomerCode(String code);
    List<Payment> findAllByCustomerId(Long id);

    Payment save(Payment payment);

    void delete(Payment payment);
}
