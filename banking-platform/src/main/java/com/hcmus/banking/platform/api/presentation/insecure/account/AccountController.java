package com.hcmus.banking.platform.api.presentation.insecure.account;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.banking.platform.core.application.admin.PaymentUseCaseService;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController("ApiAccountController")
@RequiredArgsConstructor
@RequestMapping("/api/v1/accounts")
public class AccountController {
    private final PaymentUseCaseService service;

    @PostMapping
    public AccountResponse findBy(@ModelAttribute("request") Map<String,Object> request){
        ObjectMapper objectMapper = new ObjectMapper();
        ContentRequest contentRequest = objectMapper.convertValue(request.get("content"), ContentRequest.class);
        Payment payment = service.findByAccount(contentRequest.getAccount());
        return AccountResponse.of(payment);
    }
}
