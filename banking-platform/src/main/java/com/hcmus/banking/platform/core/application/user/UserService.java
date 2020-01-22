package com.hcmus.banking.platform.core.application.user;

import com.hcmus.banking.platform.core.infrastructure.datasource.user.UserRepository;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public Page<User> findAllBy(Pageable pageable) {
        return userRepository.findAllBy(pageable);
    }

    public User findById(Long id){
        return userRepository.findById(id).orElse(User.ofEmpty());
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElse(User.ofEmpty());
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email).orElse(User.ofEmpty());
    }

    public void changePassword(User user, String password){
        user.setPassword(password);
        userRepository.save(user);
    }

    public void create(User user){
        userRepository.save(user);
    }

    public void delete(User user){
        userRepository.delete(user);
    }
}
