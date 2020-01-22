package com.hcmus.banking.platform.core.presentation.partner;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
public class PartnerRequest {
    @NotNull(message = "Partner is required")
    public String name;
    @NotNull(message = "Key is required")
    public String key;

    public static Partner toPartner(PartnerRequest partnerRequest){
        return new Partner(
                partnerRequest.name,
                partnerRequest.key,
                Created.ofEmpty()
        );
    }
}
