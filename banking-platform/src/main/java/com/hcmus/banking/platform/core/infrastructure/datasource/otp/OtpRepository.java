package com.hcmus.banking.platform.core.infrastructure.datasource.otp;

import com.hcmus.banking.platform.domain.otp.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findByCode(String code);
    Optional<OTP> findByEmail(String email);
    OTP save(OTP otp);
}
