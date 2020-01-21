package com.hcmus.banking.platform.core.presentation.authentication;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class LoginRequest {
    @NotNull(message = "Username is required")
    private String username;

    @NotNull(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    private String password;

    private Boolean rememberMe = false;
}
