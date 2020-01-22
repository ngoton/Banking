package com.hcmus.banking.platform.core.presentation.user;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
public class ForgotPasswordRequest {
    @NotNull(message = "Email is required")
    @Email
    String email;
}
