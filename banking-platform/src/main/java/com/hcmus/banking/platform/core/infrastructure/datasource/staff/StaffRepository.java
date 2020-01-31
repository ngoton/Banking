package com.hcmus.banking.platform.core.infrastructure.datasource.staff;

import com.hcmus.banking.platform.domain.staff.Staff;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Page<Staff> findAllBy(Pageable pageable);
    Optional<Staff> findById(Long id);
    Optional<Staff> findByCode(String code);
    Optional<Staff> findByInfoUserId(Long id);
    Staff save(Staff customer);
    void delete(Staff customer);
}
