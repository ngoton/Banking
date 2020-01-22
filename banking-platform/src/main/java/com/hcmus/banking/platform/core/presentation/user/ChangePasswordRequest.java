package com.hcmus.banking.platform.core.presentation.user;

import lombok.Getter;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
public class ChangePasswordRequest {
    @NotNull(message = "Email is required")
    String email;
    @NotBlank(message = "New password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    String newPassword;
    @NotBlank(message = "Confirm password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    String confirmPassword;
    @NotBlank(message = "Current password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    String currentPassword;

    @AssertTrue(message = "Password does not match")
    public boolean isValidatePassword() {
        return newPassword.equals(confirmPassword);
    }
}
