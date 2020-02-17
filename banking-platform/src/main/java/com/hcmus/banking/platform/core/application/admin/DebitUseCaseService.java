package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.debit.DebitService;
import com.hcmus.banking.platform.domain.debit.Debit;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DebitUseCaseService {
    private final DebitService debitService;

    @Transactional(readOnly = true)
    public Page<Debit> findAllBy(Pageable pageable) {
        return debitService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Debit findById(Long id) {
        Debit debit = debitService.findById(id);
        if (debit.isEmpty()) {
            throw new BankingServiceException("Debit not found");
        }
        return debit;
    }

    @Transactional(readOnly = true)
    public List<Debit> findAllByCustomerCode(String code) {
        List<Debit> debits = debitService.findAllByCustomerCode(code);
        return debits;
    }

    @Transactional(readOnly = true)
    public Debit findByAccount(String code) {
        Debit debit = debitService.findByAccount(code);
        if (debit.isEmpty()) {
            throw new BankingServiceException("Debit not found");
        }
        return debit;
    }

    @Transactional(readOnly = true)
    public List<Debit> findAllByCustomerId(Long id) {
        List<Debit> debits = debitService.findAllByCustomerId(id);
        return debits;
    }

    @Transactional
    public void create(Debit debit) {
        debitService.create(debit);
    }

    @Transactional
    public void update(Debit debit) {
        Debit oldDebit = debitService.findByAccount(debit.getAccount());
        if (oldDebit.isEmpty()) {
            throw new BankingServiceException("Debit not found");
        }
        debitService.update(oldDebit, debit);
    }

    @Transactional
    public void delete(Long id) {
        Debit debit = debitService.findById(id);
        if (debit.isEmpty()) {
            throw new BankingServiceException("Debit not found");
        }
        debitService.delete(debit);
    }
}
