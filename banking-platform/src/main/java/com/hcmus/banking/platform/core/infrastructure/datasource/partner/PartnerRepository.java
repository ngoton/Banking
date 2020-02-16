package com.hcmus.banking.platform.core.infrastructure.datasource.partner;

import com.hcmus.banking.platform.domain.partner.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {
    List<Partner> findAll();
    Optional<Partner> findById(Long id);
    Optional<Partner> findByKey(String key);
    Optional<Partner> findByName(String name);
    Partner save(Partner partner);
}
