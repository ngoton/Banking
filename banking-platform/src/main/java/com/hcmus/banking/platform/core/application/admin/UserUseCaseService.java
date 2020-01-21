package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.user.UserService;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserUseCaseService {
    private final UserService userService;
    private final PasswordService passwordService;

    @Transactional(readOnly = true)
    public List<User> findAll(){
        return userService.findAll();
    }

    @Transactional(readOnly = true)
    public Page<User> findAllBy(Pageable pageable) {
        return userService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public User findById(Long id){
        return userService.findById(id);
    }

    @Transactional
    public void changePassword(Long userId, String password, String currentPassword){
        User user = userService.findById(userId);
        if (!passwordService.isMatchPassword(currentPassword, user.getPassword())) {
            throw new BankingServiceException("Password does not match");
        }
        userService.changePassword(user, passwordService.encode(password));
    }
}
