package com.hcmus.banking.platform.core.presentation.partner;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PartnerRequest {
    public String name;
    public String key;

    public static Partner toPartner(PartnerRequest partnerRequest){
        return new Partner(
                partnerRequest.name,
                partnerRequest.key,
                Created.ofEmpty()
        );
    }
}
