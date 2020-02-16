package com.hcmus.banking.platform.core.presentation.partner;


import com.hcmus.banking.platform.core.presentation.payment.PaymentResponse;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class PartnerResponses {
    final List<PartnerResponse> paymentResponses;

    public static List<PartnerResponse> ofList(List<Partner> partners) {
        List<PartnerResponse> responses = partners.stream()
                .map(partner -> new PartnerResponse(partner))
                .collect(Collectors.toList());
        return responses;
    }

}
