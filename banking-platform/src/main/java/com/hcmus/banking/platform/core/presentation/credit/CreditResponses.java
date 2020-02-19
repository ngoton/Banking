package com.hcmus.banking.platform.core.presentation.credit;

import com.hcmus.banking.platform.domain.credit.Credit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class CreditResponses {
    final List<Credit> credits;

    public static Page<CreditResponse> ofPage(Page<Credit> creditPage, Pageable pageable) {
        List<Credit> credits = creditPage.getContent();
        long total = creditPage.getTotalElements();
        List<CreditResponse> responses = credits.stream()
                .map(credit -> new CreditResponse(credit))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }

    public static List<CreditResponse> ofList(List<Credit> credits) {
        List<CreditResponse> responses = credits.stream()
                .map(credit -> new CreditResponse(credit))
                .collect(Collectors.toList());
        return responses;
    }
}
