package com.hcmus.banking.platform.core.infrastructure.datasource.info;

import com.hcmus.banking.platform.domain.info.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InfoRepository extends JpaRepository<Info, Long> {
    Optional<Info> findById(Long id);
    Optional<Info> findByCustomerCode(String code);
    Info save(Info info);
    void delete(Info info);
}
