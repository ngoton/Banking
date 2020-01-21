package com.hcmus.banking.platform.core.presentation.authentication;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class RefreshTokenRequest {
    @NotNull(message = "Token is required")
    private String token;
}
