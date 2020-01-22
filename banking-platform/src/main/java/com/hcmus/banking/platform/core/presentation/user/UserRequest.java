package com.hcmus.banking.platform.core.presentation.user;

import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.user.Role;
import com.hcmus.banking.platform.domain.user.Status;
import com.hcmus.banking.platform.domain.user.User;
import lombok.AllArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
public class UserRequest {
    @NotNull(message = "Username is required")
    String username;
    @NotNull(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    String password;
    @NotNull(message = "Email is required")
    @Email
    String email;
    @NotNull(message = "Role is required")
    String role;

    public static User toUser(UserRequest userRequest){
        return new User(
               userRequest.username,
               userRequest.password,
               userRequest.email,
               Role.valueOf(userRequest.role),
               Status.ACTIVE,
               Created.ofEmpty()
        );
    }
}
