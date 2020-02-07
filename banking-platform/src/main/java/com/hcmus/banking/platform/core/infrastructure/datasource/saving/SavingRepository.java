package com.hcmus.banking.platform.core.infrastructure.datasource.saving;

import com.hcmus.banking.platform.domain.saving.Saving;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavingRepository extends JpaRepository<Saving, Long> {
    Page<Saving> findAllBy(Pageable pageable);
    Optional<Saving> findById(Long id);
    Optional<Saving> findByAccount(String account);
    List<Saving> findAllByCustomerId(Long id);
    Saving save(Saving saving);
    void delete(Saving saving);
}
