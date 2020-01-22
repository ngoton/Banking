package com.hcmus.banking.platform.core.presentation.authentication;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
public class OtpVerifyRequest {
    @NotNull(message = "Email is required")
    @Email
    String email;
    @NotNull(message = "OTP code is required")
    String code;
}
