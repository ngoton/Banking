package com.hcmus.banking.platform.core.presentation.user;

import com.hcmus.banking.platform.domain.user.User;

public class UserResponse {
    public String username;
    public String email;

    public UserResponse(User user){
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
