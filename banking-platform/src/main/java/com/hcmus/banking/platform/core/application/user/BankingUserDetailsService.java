package com.hcmus.banking.platform.core.application.user;

import com.hcmus.banking.platform.core.infrastructure.datasource.user.UserRepository;
import com.hcmus.banking.platform.domain.user.BankingUser;
import com.hcmus.banking.platform.domain.user.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component("bankingUserDetailsService")
public class BankingUserDetailsService implements UserDetailsService {
    @NonNull
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(final String username) {
        User user = userRepository.findByUsername(username).orElse(User.ofEmpty());
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new BankingUser(user);
    }
}
