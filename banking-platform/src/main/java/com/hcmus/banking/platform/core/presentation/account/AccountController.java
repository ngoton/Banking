package com.hcmus.banking.platform.core.presentation.account;

import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.customer.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final CustomerUseCaseService customerService;

    @GetMapping
    public AccountResponse findByAccount(AccountRequest accountRequest){
        if (accountRequest.bankName.equals(Beneficiary.BANK_NAME)){
            Customer customer = customerService.findByAccount(accountRequest.account);
            return new AccountResponse(customer, accountRequest.account, accountRequest.bankName);
        }

        return AccountResponse.ofEmpty();
    }

}
