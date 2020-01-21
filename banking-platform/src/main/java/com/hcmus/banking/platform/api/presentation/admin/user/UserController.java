package com.hcmus.banking.platform.api.presentation.admin.user;

import com.hcmus.banking.platform.api.application.admin.UserUseCaseService;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("ApiUserController")
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserUseCaseService service;

    @GetMapping
    public Page<UserResponse> findAllBy(Pageable pageable){
        Page<User> users = service.findAllBy(pageable);
        return UserResponses.ofPage(users, pageable);
    }
}
