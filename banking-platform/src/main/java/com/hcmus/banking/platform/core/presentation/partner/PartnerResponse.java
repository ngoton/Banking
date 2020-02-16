package com.hcmus.banking.platform.core.presentation.partner;

import com.hcmus.banking.platform.domain.partner.Partner;

public class PartnerResponse {
    public String name;

    public PartnerResponse(Partner partner) {
        this.name = partner.getName();
    }
}
