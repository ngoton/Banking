package com.hcmus.banking.platform.api.presentation.insecure.account;

import com.hcmus.banking.platform.core.application.admin.PaymentUseCaseService;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController("ApiAccountController")
@RequiredArgsConstructor
@RequestMapping("/api/v1/accounts")
public class AccountController {
    private final PaymentUseCaseService service;

    @PostMapping
    public AccountResponse findBy(@Valid @RequestBody AccountRequest accountRequest){
        Payment payment = service.findByAccount(accountRequest.getContent().getAccount());
        return AccountResponse.of(payment);
    }
}
