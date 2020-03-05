package com.hcmus.banking.platform.core.infrastructure.datasource.debit;

import com.hcmus.banking.platform.domain.debit.Debit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DebitRepository extends JpaRepository<Debit, Long> {
    Page<Debit> findAllByOrderByIdDesc(Pageable pageable);
    Optional<Debit> findById(Long id);
    Optional<Debit> findByAccount(String account);
    Page<Debit> findAllByCustomerCodeOrderByIdDesc(String code, Pageable pageable);
    Page<Debit> findAllByCustomerIdOrderByIdDesc(Long id, Pageable pageable);
    Debit save(Debit debit);
    void delete(Debit debit);
}
