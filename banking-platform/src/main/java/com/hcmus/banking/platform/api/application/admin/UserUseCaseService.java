package com.hcmus.banking.platform.api.application.admin;

import com.hcmus.banking.platform.core.application.user.UserService;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("ApiUserUseCaseService")
@RequiredArgsConstructor
public class UserUseCaseService {
    private final UserService userService;

    @Transactional(readOnly = true)
    public Page<User> findAllBy(Pageable pageable){
        return userService.findAllBy(pageable);
    }
}
