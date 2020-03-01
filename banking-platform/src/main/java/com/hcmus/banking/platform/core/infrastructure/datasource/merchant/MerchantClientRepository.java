package com.hcmus.banking.platform.core.infrastructure.datasource.merchant;

import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.merchant.MerchantTransfer;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class MerchantClientRepository {
    @NonNull
    final MerchantClientFactory merchantClientFactory;

    public MerchantAccount findAccount(MerchantCriteria merchantCriteria){
        MerchantClient merchantClient = merchantClientFactory.detect(merchantCriteria.getPartner().getEncryption());
        return merchantClient.findAccount(merchantCriteria);
    }
    public MerchantTransfer transfer(MerchantCriteria merchantCriteria){
        MerchantClient merchantClient = merchantClientFactory.detect(merchantCriteria.getPartner().getEncryption());
        return merchantClient.transfer(merchantCriteria);
    }
    public MerchantDeposit deposit(MerchantCriteria merchantCriteria){
        MerchantClient merchantClient = merchantClientFactory.detect(merchantCriteria.getPartner().getEncryption());
        return merchantClient.deposit(merchantCriteria);
    }
}
