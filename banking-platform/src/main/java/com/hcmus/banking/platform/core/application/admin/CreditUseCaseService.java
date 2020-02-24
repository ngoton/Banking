package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.credit.CreditService;
import com.hcmus.banking.platform.core.application.debit.DebitService;
import com.hcmus.banking.platform.core.application.notification.NotificationService;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.notification.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreditUseCaseService {
    private final CreditService creditService;
    private final DebitService debitService;
    private final NotificationService notificationService;

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
    public Page<Credit> findAllByCustomerCode(String code, Pageable pageable) {
        Page<Credit> credits = creditService.findAllByCustomerCode(code, pageable);
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
    public Page<Credit> findAllByCustomerId(Long id, Pageable pageable) {
        Page<Credit> credits = creditService.findAllByCustomerId(id, pageable);
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

        Notification notification = new Notification(
                String.format("%s %s", credit.getCustomer().getInfo().getFirstName(), credit.getCustomer().getInfo().getLastName()),
                String.format("%s %s", credit.getContent(), "[Canceled]"),
                LocalDateTime.now()
        );
        notificationService.notify(notification, credit.getDebit().getCustomer().getInfo().getUser().getUsername());

        debitService.delete(credit.getDebit());
        creditService.delete(credit);
    }

    @Transactional(readOnly = true)
    public Page<Credit> findPending(Pageable pageable) {
        return creditService.findPending(pageable);
    }
}
