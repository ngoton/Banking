package com.hcmus.banking.platform.core.presentation.user;

import com.hcmus.banking.platform.core.application.admin.UserUseCaseService;
import com.hcmus.banking.platform.core.constants.SecurityUtils;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.user.BankingUser;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/users")
public class UserController {
    private final UserUseCaseService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public Page<UserResponse> findAllBy(Pageable pageable){
        Page<User> users = userService.findAllBy(pageable);
        return UserResponses.ofPage(users, pageable);
    }

    @PostMapping("/info")
    public UserResponse info() {
        Optional<BankingUser> bankingUser = SecurityUtils.asBankingUser();
        if (!bankingUser.isPresent()){
            throw new NotFoundException();
        }
        return new UserResponse(bankingUser.get().user());
    }

    @PostMapping("/change-password")
    public void changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(request.getEmail(), request.getNewPassword(), request.getCurrentPassword());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public void create(@Valid @RequestBody UserRequest userRequest){
        User user = UserRequest.toUser(userRequest);
        userService.create(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id){
        userService.delete(id);
    }
}
