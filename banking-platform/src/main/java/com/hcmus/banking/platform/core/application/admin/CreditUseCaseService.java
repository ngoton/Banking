package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.credit.CreditService;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditUseCaseService {
    private final CreditService creditService;

    @Transactional(readOnly = true)
    public Page<Credit> findAllBy(Pageable pageable) {
        return creditService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public Credit findById(Long id) {
        Credit credit = creditService.findById(id);
        if (credit.isEmpty()) {
            throw new BankingServiceException("Credit not found");
        }
        return credit;
    }

    @Transactional(readOnly = true)
    public List<Credit> findAllByCustomerCode(String code) {
        List<Credit> credits = creditService.findAllByCustomerCode(code);
        return credits;
    }

    @Transactional(readOnly = true)
    public Credit findByAccount(String code) {
        Credit credit = creditService.findByAccount(code);
        if (credit.isEmpty()) {
            throw new BankingServiceException("Credit not found");
        }
        return credit;
    }

    @Transactional(readOnly = true)
    public List<Credit> findAllByCustomerId(Long id) {
        List<Credit> credits = creditService.findAllByCustomerId(id);
        return credits;
    }

    @Transactional
    public void create(Credit credit) {
        creditService.create(credit);
    }

    @Transactional
    public void update(Credit credit, Long id) {
        Credit oldCredit = creditService.findById(id);
        if (oldCredit.isEmpty()) {
            throw new BankingServiceException("Credit not found");
        }
        creditService.update(oldCredit, credit);
    }

    @Transactional
    public void delete(Long id) {
        Credit credit = creditService.findById(id);
        if (credit.isEmpty()) {
            throw new BankingServiceException("Credit not found");
        }
        creditService.delete(credit);
    }

    public Page<Credit> findPending(Pageable pageable) {
        return creditService.findPending(pageable);
    }
}
