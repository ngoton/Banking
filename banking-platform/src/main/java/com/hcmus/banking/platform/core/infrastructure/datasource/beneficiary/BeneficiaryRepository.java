package com.hcmus.banking.platform.core.infrastructure.datasource.beneficiary;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    Page<Beneficiary> findAllBy(Pageable pageable);
    Optional<Beneficiary> findById(Long id);
    Optional<Beneficiary> findByName(String name);
    Optional<Beneficiary> findByAccount(String account);
    Optional<Beneficiary> findByAccountAndCustomerId(String account, Long id);
    List<Beneficiary> findAllByCustomerCode(String code);
    List<Beneficiary> findAllByBankName(String bankName);
    List<Beneficiary> findAllByCustomerId(Long id);
    Beneficiary save(Beneficiary beneficiary);
    void delete(Beneficiary beneficiary);
}
