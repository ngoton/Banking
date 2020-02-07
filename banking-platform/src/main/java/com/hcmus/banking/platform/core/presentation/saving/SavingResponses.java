package com.hcmus.banking.platform.core.presentation.saving;

import com.hcmus.banking.platform.domain.saving.Saving;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class SavingResponses {
    final List<SavingResponse> savingResponses;

    public static Page<SavingResponse> ofPage(Page<Saving> savingPage, Pageable pageable) {
        List<Saving> savings = savingPage.getContent();
        long total = savingPage.getTotalElements();
        List<SavingResponse> responses = savings.stream()
                .map(beneficiary -> new SavingResponse(beneficiary))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }

    public static List<SavingResponse> ofList(List<Saving> savings) {
        List<SavingResponse> responses = savings.stream()
                .map(saving -> new SavingResponse(saving))
                .collect(Collectors.toList());
        return responses;
    }
}
