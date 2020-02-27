package com.hcmus.banking.platform.core.application.merchant;

import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantClientRepository;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantCriteria;
import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.merchant.MerchantTransfer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MerchantService {
    private final MerchantClientRepository merchantClientRepository;

    public MerchantAccount findAccount(MerchantCriteria merchantCriteria){
        return merchantClientRepository.findAccount(merchantCriteria);
    }

    public MerchantTransfer transfer(MerchantCriteria merchantCriteria){
        return merchantClientRepository.transfer(merchantCriteria);
    }

    public MerchantDeposit deposit(MerchantCriteria merchantCriteria){
        return merchantClientRepository.deposit(merchantCriteria);
    }
}
