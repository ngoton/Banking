package com.hcmus.banking.platform.core.application.user.password;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PasswordService {
    @Autowired
    PasswordEncoder passwordEncoder;

    public String encode (String password) {
        return passwordEncoder.encode(password);
    }

    public boolean isMatchPassword (String password, String hashPass) {
        return passwordEncoder.matches(password, hashPass);
    }
}
