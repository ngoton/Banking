package com.hcmus.banking.platform.core.presentation.authentication;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class LoginRequest {
    @NotNull(message = "Username is required")
    private String username;

    @NotNull(message = "Password is required")
    private String password;

    private Boolean rememberMe = false;
}
