package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.partner.PartnerService;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        Partner byKey = partnerService.findByKey(partner.getKey());
        if (!byKey.isEmpty()){
            throw new BankingServiceException("Key is already exists");
        }
        partnerService.create(partner);
    }
}
