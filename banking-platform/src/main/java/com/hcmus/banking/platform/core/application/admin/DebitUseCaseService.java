package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.credit.CreditService;
import com.hcmus.banking.platform.core.application.debit.DebitService;
import com.hcmus.banking.platform.core.application.notification.NotificationService;
import com.hcmus.banking.platform.core.application.payment.PaymentService;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.debit.Debit;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.notification.Notification;
import com.hcmus.banking.platform.domain.payment.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DebitUseCaseService {
    private final DebitService debitService;
    private final CreditService creditService;
    private final PaymentService paymentService;
    private final NotificationService notificationService;

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
        Payment payment = paymentService.findByAccount(debit.getAccount());
        if (payment.isEmpty()){
            throw new BankingServiceException("Account not found");
        }
        debitService.create(debit);

        Credit credit = new Credit(
                debit.getCustomer().getPayment().getAccount(),
                debit.getMoney(),
                debit.getContent(),
                payment.getCustomer(),
                Created.ofEmpty()
        );
        creditService.create(credit);

        Notification notification = new Notification(
                String.format("%s %s", debit.getCustomer().getInfo().getFirstName(), debit.getCustomer().getInfo().getLastName()),
                debit.getContent(),
                LocalDateTime.now()
        );
        notificationService.notify(notification, credit.getCustomer().getInfo().getUser().getUsername());
    }

    @Transactional
    public void update(Debit debit, Long id) {
        Debit oldDebit = debitService.findById(id);
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
