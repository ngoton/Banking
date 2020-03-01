package com.hcmus.banking.platform.core.infrastructure.datasource.merchant;

import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.merchant.MerchantTransfer;

public interface MerchantClient {
    MerchantAccount findAccount(MerchantCriteria merchantCriteria);
    MerchantTransfer transfer(MerchantCriteria merchantCriteria);
    MerchantDeposit deposit(MerchantCriteria merchantCriteria);
}
