package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.partner.PartnerService;
import com.hcmus.banking.platform.config.security.RSAGenerator;
import com.hcmus.banking.platform.core.utils.RandomUtils;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class PartnerUseCaseService {
    private final PartnerService partnerService;

    @Transactional
    public void create(Partner partner){
        Partner byName = partnerService.findByName(partner.getName());
        if (!byName.isEmpty()){
            throw new BankingServiceException("Partner is already exists");
        }

//        try {
//            RSAGenerator rsaGenerator = new RSAGenerator();
//            rsaGenerator.createKeys();
//            partner.setPrivateKey(rsaGenerator.getPrivateKeyAsText());
//            partner.setPublicKey(rsaGenerator.getPublicKeyAsText());
//        } catch (NoSuchAlgorithmException e) {
//            throw new BankingServiceException("No such Algorithm");
//        }

        partner.setKey(RandomUtils.generateApiKey());

        partnerService.create(partner);
    }
}
