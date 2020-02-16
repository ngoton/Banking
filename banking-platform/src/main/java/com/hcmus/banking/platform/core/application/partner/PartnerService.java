package com.hcmus.banking.platform.core.application.partner;

import com.hcmus.banking.platform.core.infrastructure.datasource.partner.PartnerRepository;
import com.hcmus.banking.platform.domain.partner.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartnerService {
    private final PartnerRepository partnerRepository;

    public Partner findById(Long id){
        return partnerRepository.findById(id).orElse(Partner.ofEmpty());
    }

    public Partner findByKey(String key){
        return partnerRepository.findByKey(key).orElse(Partner.ofEmpty());
    }

    public Partner findByName(String name){
        return partnerRepository.findByName(name).orElse(Partner.ofEmpty());
    }

    public void create(Partner partner){
        partnerRepository.save(partner);
    }

    public List<Partner> findAll() {
        return partnerRepository.findAll();
    }
}
