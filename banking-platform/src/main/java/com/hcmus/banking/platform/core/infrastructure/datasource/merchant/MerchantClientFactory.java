package com.hcmus.banking.platform.core.infrastructure.datasource.merchant;

import com.hcmus.banking.platform.domain.partner.Encryption;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MerchantClientFactory {
    @Autowired
    @Qualifier("PGPClient")
    @NonNull final MerchantClient pgpClient;

    @Autowired
    @Qualifier("RSAClient")
    @NonNull final MerchantClient rsaClient;

    public MerchantClient detect(Encryption encryption){
        if(encryption.isRSA())
            return rsaClient;
        return pgpClient;
    }
}
