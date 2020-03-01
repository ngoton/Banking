package com.hcmus.banking.platform.core.infrastructure.datasource.merchant.HCMUS.RSA;

import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantClient;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantCriteria;
import com.hcmus.banking.platform.domain.merchant.MerchantAccount;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.merchant.MerchantTransfer;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component("RSAClient")
public class RSAClient implements MerchantClient {
    RestTemplate restTemplate;

    @Override
    public MerchantAccount findAccount(MerchantCriteria merchantCriteria) {
        return null;
    }

    @Override
    public MerchantTransfer transfer(MerchantCriteria merchantCriteria) {
        return null;
    }

    @Override
    public MerchantDeposit deposit(MerchantCriteria merchantCriteria) {
        return null;
    }
}
