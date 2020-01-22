package com.hcmus.banking.platform.core.application.otp;

import com.hcmus.banking.platform.core.infrastructure.datasource.otp.OtpRepository;
import com.hcmus.banking.platform.domain.otp.OTP;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final OtpRepository otpRepository;

    public OTP findByCode(String code){
        return otpRepository.findByCode(code).orElse(OTP.ofEmpty());
    }

    public OTP findByEmail(String email){
        return otpRepository.findByEmail(email).orElse(OTP.ofEmpty());
    }

    public OTP findByEmailAndCode(String email, String code){
        return otpRepository.findByEmailAndCode(email, code).orElse(OTP.ofEmpty());
    }

    public void create(OTP otp){
        otpRepository.save(otp);
    }

    public void delete(OTP otp){
        otpRepository.delete(otp);
    }
}
