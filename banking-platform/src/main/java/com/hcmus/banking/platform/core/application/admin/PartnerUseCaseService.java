package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.partner.PartnerService;
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
        partnerService.create(partner);
    }
}
