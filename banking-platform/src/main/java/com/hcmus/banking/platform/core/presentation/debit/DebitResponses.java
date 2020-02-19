package com.hcmus.banking.platform.core.presentation.debit;


import com.hcmus.banking.platform.domain.debit.Debit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class DebitResponses {
    final List<DebitResponse> debitResponses;

    public static Page<DebitResponse> ofPage(Page<Debit> debitPage, Pageable pageable) {
        List<Debit> debits = debitPage.getContent();
        long total = debitPage.getTotalElements();
        List<DebitResponse> responses = debits.stream()
                .map(debit -> new DebitResponse(debit))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }

    public static List<DebitResponse> ofList(List<Debit> debits) {
        List<DebitResponse> responses = debits.stream()
                .map(debit -> new DebitResponse(debit))
                .collect(Collectors.toList());
        return responses;
    }

}
