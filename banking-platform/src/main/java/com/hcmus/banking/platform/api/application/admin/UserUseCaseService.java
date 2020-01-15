package com.hcmus.banking.platform.api.application.admin;

import com.hcmus.banking.platform.core.application.admin.UserService;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserUseCaseService {
    private final UserService userService;

    public Page<User> findAllBy(Pageable pageable){
        return userService.findAllBy(pageable);
    }
}
