package com.hcmus.banking.platform.api.application.partner;

import com.hcmus.banking.platform.core.application.partner.PartnerService;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("ApiPartnerUseCaseService")
@RequiredArgsConstructor
public class PartnerUseCaseService {
    private final PartnerService partnerService;

    @Transactional(readOnly = true)
    public Partner findById(Long id){
        return partnerService.findById(id);
    }

    @Transactional(readOnly = true)
    public Partner findByKey(String key){
        return partnerService.findByKey(key);
    }
}
