package com.hcmus.banking.platform.core.presentation.advice;

import com.hcmus.banking.platform.core.application.admin.UserUseCaseService;
import com.hcmus.banking.platform.core.constants.SecurityUtils;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.user.BankingUser;
import com.hcmus.banking.platform.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@RestControllerAdvice(annotations = {UserAdvice.On.class})
public class UserAdvice {
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface On{}

    @Autowired
    UserUseCaseService userUseCaseService;

    @ModelAttribute
    User user(){
        BankingUser bankingUser = SecurityUtils.asBankingUser().orElseThrow(() -> new NotFoundException());
        return userUseCaseService.findById(bankingUser.getId());
    }

}
