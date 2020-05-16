package com.hcmus.banking.platform.core.presentation.account;

import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.core.application.merchant.MerchantService;
import com.hcmus.banking.platform.core.application.partner.PartnerService;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantCriteria;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final CustomerUseCaseService customerService;
    private final PartnerService partnerService;
    private final MerchantService merchantService;

    @GetMapping
    public AccountResponse findByAccount(AccountRequest accountRequest){
        if (accountRequest.bankName.equals(Beneficiary.BANK_NAME)){
            Customer customer = customerService.findByAccount(accountRequest.account);
            return new AccountResponse(customer, accountRequest.account, accountRequest.bankName);
        }
        else {
            Partner partner = partnerService.findByName(accountRequest.bankName);
            if (!partner.isEmpty()){
                MerchantCriteria merchantCriteria = new MerchantCriteria(partner, accountRequest.account);
                MerchantAccount merchantAccount = merchantService.findAccount(merchantCriteria);
                if (merchantAccount.isEmpty()){
                    return new AccountResponse(merchantAccount.getName(), accountRequest.account, accountRequest.bankName);
                }
            }
        }

        return AccountResponse.ofEmpty();
    }

}
