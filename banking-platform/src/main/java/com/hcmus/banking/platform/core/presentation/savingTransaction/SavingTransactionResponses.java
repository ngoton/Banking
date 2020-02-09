package com.hcmus.banking.platform.core.presentation.savingTransaction;

import com.hcmus.banking.platform.domain.savingTransaction.SavingTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class SavingTransactionResponses {
    final List<SavingTransactionResponse> savingTransactionResponses;

    public static Page<SavingTransactionResponse> ofPage(Page<SavingTransaction> SavingTransactionPage, Pageable pageable) {
        List<SavingTransaction> savingTransactions = SavingTransactionPage.getContent();
        long total = SavingTransactionPage.getTotalElements();
        List<SavingTransactionResponse> responses = savingTransactions.stream()
                .map(savingTransaction -> new SavingTransactionResponse(savingTransaction))
                .collect(Collectors.toList());
        return new PageImpl(responses, pageable, total);
    }
}
