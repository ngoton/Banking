package com.hcmus.banking.platform.api.presentation.admin.user;

import com.hcmus.banking.platform.domain.user.User;

public class UserResponse {
    public String email;

    public UserResponse(User user){
        this.email = user.getEmail();
    }
}
