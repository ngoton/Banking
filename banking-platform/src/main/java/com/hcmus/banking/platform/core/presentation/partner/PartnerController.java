package com.hcmus.banking.platform.core.presentation.partner;

import com.hcmus.banking.platform.core.application.admin.CustomerUseCaseService;
import com.hcmus.banking.platform.core.application.admin.PartnerUseCaseService;
import com.hcmus.banking.platform.core.presentation.customer.CustomerResponse;
import com.hcmus.banking.platform.core.presentation.customer.CustomerResponses;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/partners")
@RequiredArgsConstructor
public class PartnerController {
    private final PartnerUseCaseService partnerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public void create(@RequestBody PartnerRequest partnerRequest){
        Partner partner = PartnerRequest.toPartner(partnerRequest);
        partnerService.create(partner);
    }
}
