package com.hcmus.banking.platform.core.presentation.partner;

import com.hcmus.banking.platform.core.application.admin.PartnerUseCaseService;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/internal/partners")
@RequiredArgsConstructor
public class PartnerController {
    private final PartnerUseCaseService partnerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public void create(@Valid @RequestBody PartnerRequest partnerRequest){
        Partner partner = PartnerRequest.toPartner(partnerRequest);
        partnerService.create(partner);
    }

    @GetMapping
    public List<PartnerResponse> findAll(){
        List<Partner> partners = partnerService.findAll();
        return PartnerResponses.ofList(partners);
    }
}
