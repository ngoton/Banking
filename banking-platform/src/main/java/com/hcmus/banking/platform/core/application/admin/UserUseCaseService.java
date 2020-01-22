package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.mail.MailService;
import com.hcmus.banking.platform.core.application.otp.OtpService;
import com.hcmus.banking.platform.core.application.user.UserService;
import com.hcmus.banking.platform.core.application.user.PasswordService;
import com.hcmus.banking.platform.core.utils.RandomUtil;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.mail.Mail;
import com.hcmus.banking.platform.domain.otp.OTP;
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
    private final OtpService otpService;
    private final MailService mailService;

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
        User user = userService.findById(id);
        if (user.isEmpty()){
            throw new NotFoundException();
        }
        return user;
    }

    @Transactional
    public void changePassword(Long userId, String password, String currentPassword){
        User user = userService.findById(userId);
        if (user.isEmpty()){
            throw new NotFoundException();
        }
        if (!passwordService.isMatchPassword(currentPassword, user.getPassword())) {
            throw new BankingServiceException("Password does not match");
        }
        userService.changePassword(user, passwordService.encode(password));
    }

    @Transactional
    public void create(User user){
        User byUsername = userService.findByUsername(user.getUsername());
        if (!byUsername.isEmpty()){
            throw new BankingServiceException("Username is already exists");
        }
        User byEmail = userService.findByEmail(user.getUsername());
        if (!byEmail.isEmpty()){
            throw new BankingServiceException("Email is already exists");
        }
        user.setPassword(passwordService.encode(user.getPassword()));
        userService.create(user);
    }

    @Transactional
    public void delete(Long id){
        User user = userService.findById(id);
        if (user.isEmpty()){
            throw new NotFoundException();
        }
        userService.delete(user);
    }

    @Transactional
    public void forgot(String email) {
        User user = userService.findByEmail(email);
        if (user.isEmpty()){
            throw new NotFoundException();
        }

        String code = RandomUtil.generate();
        OTP otp = OTP.with(code, email);
        otpService.create(otp);

        String name = "";
        if (user.hasCustomer()){
            name = String.format("%s %s",user.getCustomer().getFirstName(), user.getCustomer().getLastName());
        }
        Mail mail = Mail.otpTemplate(user.getEmail(), name, "[BANKING] Reset your account password", code);
        mailService.send(mail);
    }
}
