package com.hcmus.banking.platform.core.presentation.user;

import com.hcmus.banking.platform.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

public class UserResponses {
    List<UserResponse> userResponses;

    public UserResponses(List<UserResponse> userResponses) {
        this.userResponses = userResponses;
    }

    public static Page<UserResponse> ofPage(Page<User> userPage, Pageable pageable) {
        List<User> users = userPage.getContent();
        long total = userPage.getTotalElements();
        List<UserResponse> responses = users.stream()
                .map(user -> new UserResponse(user))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }


}
