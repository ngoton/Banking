package com.hcmus.banking.platform.core.infrastructure.datasource.credit;

import com.hcmus.banking.platform.domain.credit.Credit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {
    Page<Credit> findAllByOrderByIdDesc(Pageable pageable);
    Optional<Credit> findById(Long id);
    Optional<Credit> findByAccount(String account);
    Page<Credit> findAllByCustomerCodeOrderByIdDesc(String code, Pageable pageable);
    Page<Credit> findAllByCustomerIdOrderByIdDesc(Long id, Pageable pageable);
    Page<Credit> findAllByStatusIsNullOrderByIdDesc(Pageable pageable);
    Credit save(Credit credit);
    void delete(Credit credit);
}
