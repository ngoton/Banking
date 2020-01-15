package com.hcmus.banking.platform.core.infrastructure.datasource.user;

import com.hcmus.banking.platform.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findAllBy(Pageable pageable);
}
