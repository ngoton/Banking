package com.hcmus.banking.platform.domain.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class BankingUser implements UserDetails {
    private final User user;

    public BankingUser(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(String.format("ROLE_%s", this.user.getRole().name())));
//        return this.user.getRoles()
//                .list()
//                .stream()
//                .map(role -> new SimpleGrantedAuthority(role.getRoleType().name()))
//                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return !this.user.isExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.user.isLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.user.isActive();
    }

    public User user() {
        return this.user;
    }

    public static BankingUser ofEmpty() {
        return new BankingUser(User.ofEmpty());
    }

    public Long getId() {return this.user.getId();}

    public String getEmail() {
        return this.user.getEmail();
    }

    public String getFirstName() {
        return this.user.getInfo().getFirstName();
    }

    public String getLastName() {
        return this.user.getInfo().getLastName();
    }

    public String getPhone() {
        return user.getInfo().getPhone();
    }
}
