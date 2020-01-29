package com.hcmus.banking.platform.core.presentation.partner;

import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.partner.Encryption;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
public class PartnerRequest {
    @NotNull(message = "Partner is required")
    public String name;
    public String apiKey;
    public String apiPrivateKey;
    public String apiPublicKey;
    public String encryption;

    public static Partner toPartner(PartnerRequest partnerRequest){
        Encryption encryption = Encryption.NONE;
        if (partnerRequest.encryption != null && !partnerRequest.encryption.isEmpty()){
            encryption = Encryption.valueOf(partnerRequest.encryption);
        }
        return new Partner(
                partnerRequest.name,
                partnerRequest.apiKey,
                partnerRequest.apiPrivateKey,
                partnerRequest.apiPublicKey,
                encryption,
                Created.ofEmpty()
        );
    }
}
