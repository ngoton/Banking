package com.hcmus.banking.platform.core.presentation.user;

import com.hcmus.banking.platform.domain.user.User;

public class UserResponse {
    public Long userId;
    public String username;
    public String email;
    public String role;

    public UserResponse(User user){
        this.userId = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.role = user.getRole().name();
    }
}
