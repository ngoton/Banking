package com.hcmus.banking.platform.core.presentation.user;

import com.hcmus.banking.platform.core.application.admin.UserUseCaseService;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/users")
public class UserController {
    private final UserUseCaseService service;

    @GetMapping
    public Page<UserResponse> findAllBy(Pageable pageable){
        Page<User> users = service.findAllBy(pageable);
        return UserResponses.ofPage(users, pageable);
    }

    @PostMapping("/change-password")
    public void changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        service.changePassword(request.getUserId(), request.getNewPassword(), request.getCurrentPassword());
    }
}
