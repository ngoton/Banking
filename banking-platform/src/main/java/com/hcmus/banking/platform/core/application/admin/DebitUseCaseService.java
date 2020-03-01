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
    public Page<Debit> findAllByCustomerCode(String code, Pageable pageable) {
        Page<Debit> debits = debitService.findAllByCustomerCode(code, pageable);
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
    public Page<Debit> findAllByCustomerId(Long id, Pageable pageable) {
        Page<Debit> debits = debitService.findAllByCustomerId(id, pageable);
        return debits;
    }

    @Transactional
    public void create(Debit debit) {
        Payment payment = paymentService.findByAccount(debit.getAccount());
        if (payment.isEmpty()){
            throw new BankingServiceException("Account not found");
        }
        Credit credit = new Credit(
                debit.getCustomer().getPayment().getAccount(),
                debit.getMoney(),
                debit.getContent(),
                payment.getCustomer(),
                Created.ofEmpty()
        );
        creditService.create(credit);

        debit.setCredit(credit);
        debitService.create(debit);

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

        Credit oldCredit = creditService.findById(oldDebit.getCredit().getId());
        if (!oldDebit.isEmpty()) {
            creditService.update(oldCredit, debit.getCredit());
        }

        debitService.update(oldDebit, debit);
    }

    @Transactional
    public void delete(Long id) {
        Debit debit = debitService.findById(id);
        if (debit.isEmpty()) {
            throw new BankingServiceException("Debit not found");
        }

        Notification notification = new Notification(
                String.format("%s %s", debit.getCustomer().getInfo().getFirstName(), debit.getCustomer().getInfo().getLastName()),
                String.format("%s %s", debit.getContent(), "[Canceled]"),
                LocalDateTime.now()
        );
        notificationService.notify(notification, debit.getCredit().getCustomer().getInfo().getUser().getUsername());

        creditService.delete(debit.getCredit());
        debitService.delete(debit);
    }

    @Transactional
    public void cancel(Long id, String content) {
        Debit debit = debitService.findById(id);
        if (debit.isEmpty()) {
            throw new BankingServiceException("Debit not found");
        }

        Notification notification = new Notification(
                String.format("%s %s", debit.getCustomer().getInfo().getFirstName(), debit.getCustomer().getInfo().getLastName()),
                String.format("[%s] %s", debit.getContent(), content),
                LocalDateTime.now()
        );
        notificationService.notify(notification, debit.getCredit().getCustomer().getInfo().getUser().getUsername());

        Credit credit = debit.getCredit();
        credit.setStatus(2);
        creditService.create(credit);

        debit.setStatus(2);
        debitService.create(debit);
    }
}
