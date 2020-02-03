package com.hcmus.banking.platform.core.presentation.beneficiary;

import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class BeneficiaryResponses {
    final List<Beneficiary> beneficiaries;

    public static Page<BeneficiaryResponse> ofPage(Page<Beneficiary> beneficiaryPage, Pageable pageable) {
        List<Beneficiary> beneficiaries = beneficiaryPage.getContent();
        long total = beneficiaryPage.getTotalElements();
        List<BeneficiaryResponse> responses = beneficiaries.stream()
                .map(beneficiary -> new BeneficiaryResponse(beneficiary))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }
    public static List<BeneficiaryResponse> ofList(List<Beneficiary> beneficiaryList) {
        List<BeneficiaryResponse> responses = beneficiaryList.stream()
                .map(beneficiary -> new BeneficiaryResponse(beneficiary))
                .collect(Collectors.toList());
        return responses;
    }
}