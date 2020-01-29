package com.hcmus.banking.platform.core.presentation.user;

import lombok.Getter;

import javax.validation.constraints.*;
@Getter
public class ResetPasswordRequest {
    @NotNull(message = "Email is required")
    String email;
    @NotBlank(message = "New password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    String newPassword;
    @NotBlank(message = "Confirm password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    String confirmPassword;
    @AssertTrue(message = "Password does not match")
    public boolean isValidatePassword() {
        return newPassword.equals(confirmPassword);
    }
}
