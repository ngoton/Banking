package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.beneficiary.BeneficiaryService;
import com.hcmus.banking.platform.core.application.credit.CreditService;
import com.hcmus.banking.platform.core.application.customer.CustomerService;
import com.hcmus.banking.platform.core.application.debit.DebitService;
import com.hcmus.banking.platform.core.application.mail.MailService;
import com.hcmus.banking.platform.core.application.merchant.MerchantService;
import com.hcmus.banking.platform.core.application.notification.NotificationService;
import com.hcmus.banking.platform.core.application.otp.OtpService;
import com.hcmus.banking.platform.core.application.partner.PartnerService;
import com.hcmus.banking.platform.core.application.payment.PaymentService;
import com.hcmus.banking.platform.core.application.paymentTransaction.PaymentTransactionService;
import com.hcmus.banking.platform.core.infrastructure.datasource.merchant.MerchantCriteria;
import com.hcmus.banking.platform.core.utils.RandomUtils;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.credit.Credit;
import com.hcmus.banking.platform.domain.customer.Customer;
import com.hcmus.banking.platform.domain.debit.Debit;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.general.CreatedAt;
import com.hcmus.banking.platform.domain.mail.Mail;
import com.hcmus.banking.platform.domain.merchant.MerchantDeposit;
import com.hcmus.banking.platform.domain.notification.Notification;
import com.hcmus.banking.platform.domain.otp.OTP;
import com.hcmus.banking.platform.domain.partner.Partner;
import com.hcmus.banking.platform.domain.payment.Payment;
import com.hcmus.banking.platform.domain.paymentTransaction.PaymentTransaction;
import com.hcmus.banking.platform.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PaymentTransactionUseCaseService {
    private final PaymentTransactionService paymentTransactionService;
    private final PaymentService paymentService;
    private final BeneficiaryService beneficiaryService;
    private final OtpService otpService;
    private final MailService mailService;
    private final PartnerService partnerService;
    private final CustomerService customerService;
    private final DebitService debitService;
    private final CreditService creditService;
    private final NotificationService notificationService;
    private final MerchantService merchantService;

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllBy(Pageable pageable) {
        return paymentTransactionService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public PaymentTransaction findById(Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        if (paymentTransaction.isEmpty()) {
            throw new BankingServiceException("Transaction not found");
        }
        return paymentTransaction;
    }

    @Transactional
    public void delete(Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        if (paymentTransaction.isEmpty()) {
            throw new BankingServiceException("Transaction not found");
        }
        paymentTransactionService.delete(paymentTransaction);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByPaymentId(Long id, Pageable pageable) {
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Payment does not exist!!!");
        }
        return paymentTransactionService.findAllByPaymentId(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByPaymentIdAndMoneyGreaterThan(Long id, Pageable pageable) {
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Payment does not exist!!!");
        }
        return paymentTransactionService.findAllByPaymentIdAndMoneyGreaterThan(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyGreaterThan(Long id, Pageable pageable) {
        Customer customer = customerService.findById(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer does not exist!!!");
        }
        return paymentTransactionService.findAllByPaymentCustomerIdAndMoneyGreaterThan(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByPaymentCustomerIdAndMoneyLessThan(Long id, Pageable pageable) {
        Customer customer = customerService.findById(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer does not exist!!!");
        }
        return paymentTransactionService.findAllByPaymentCustomerIdAndMoneyLessThan(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByCredit(Long id, Pageable pageable) {
        Customer customer = customerService.findByPaymentId(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer does not exist!!!");
        }
        return paymentTransactionService.findAllByCredit(customer.getId(), pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByCreditCustomer(Long id, Pageable pageable) {
        Customer customer = customerService.findById(id);
        if (customer.isEmpty()) {
            throw new BankingServiceException("Customer does not exist!!!");
        }
        return paymentTransactionService.findAllByCredit(customer.getId(), pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByPaymentIdAndMoneyLessThan(Long id, Pageable pageable) {
        Payment payment = paymentService.findById(id);
        if (payment.isEmpty()) {
            throw new BankingServiceException("Payment does not exist!!!");
        }
        return paymentTransactionService.findAllByPaymentIdAndMoneyLessThan(id, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByPartnerName(String name, Pageable pageable) {
        Partner partner = partnerService.findByName(name);
        if (partner.isEmpty()) {
            throw new BankingServiceException("Partner does not exist!!!");
        }
        return paymentTransactionService.findAllByPartnerName(name, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllByBeneficiary(Long id, Pageable pageable) {
        Beneficiary beneficiary = beneficiaryService.findById(id);
        if (beneficiary.isEmpty()) {
            throw new BankingServiceException("Beneficiary does not exist!!!");
        }
        return paymentTransactionService.findAllByBeneficiary(id, pageable);
    }

    @Transactional
    public PaymentTransaction payment(PaymentTransaction paymentTransaction, User user) {
        if (paymentTransaction.getMoney().signum() <= 0) {
            throw new BankingServiceException("Money must be greater than zero");
        }
        Payment payment = paymentTransaction.getPayment();
        if ((payment.getBalance().subtract(paymentTransaction.getMoney())).signum() < 0) {
            throw new BankingServiceException("Not enough money");
        }

        try {
            String code = RandomUtils.generate();
            OTP otp = OTP.with(code, user.getEmail());
            otpService.create(otp);

            String name = "";
            if (user.hasInfo()) {
                name = String.format("%s %s", user.getInfo().getFirstName(), user.getInfo().getLastName());
            }
            Mail mail = Mail.paymentTemplate(user.getEmail(), name, "[BANKING] Payment Requesting", code, paymentTransaction.getMoney(), paymentTransaction.getPayment().getAccount(), paymentTransaction.getBeneficiary().getAccount());
            mailService.send(mail);
            return paymentTransaction;
        } catch (Exception err) {
            throw new BankingServiceException(err.getMessage());
        }

    }

    @Transactional
    public void paymentVerify(PaymentTransaction toPaymentTransaction, Boolean fee, String email, String code, Long debitId) {
        OTP otp = otpService.findByEmailAndCode(email, code);
        if (otp.isEmpty() || otp.isExpired()) {
            throw new BankingServiceException("OTP code is expired");
        }
        otpService.delete(otp);

        Payment payment = toPaymentTransaction.getPayment();
        payment.setBalance(payment.getBalance().subtract(toPaymentTransaction.getMoney()));
        if (payment.getBalance().signum() < 0) {
            throw new BankingServiceException("Not enough money");
        }

        PaymentTransaction paymentTransaction = new PaymentTransaction(
                RandomUtils.generateTransactionCode(),
                BigDecimal.ZERO.subtract(toPaymentTransaction.getMoney()),
                toPaymentTransaction.getContent(),
                Created.ofEmpty(),
                toPaymentTransaction.getPayment(),
                toPaymentTransaction.getBeneficiary()
        );

        paymentTransactionService.create(paymentTransaction);

        //paymentService.create(payment);

        BigDecimal money = toPaymentTransaction.getMoney();

        BigDecimal transFee;
        if (toPaymentTransaction.getBeneficiary().isInternal()) {
            transFee = PaymentTransaction.internalFee();
        } else {
            transFee = PaymentTransaction.externalFee();
        }

        if (fee) {
            PaymentTransaction paymentTransactionFee = new PaymentTransaction(
                    RandomUtils.generateTransactionCode(),
                    PaymentTransaction.internalFee(),
                    String.format("Phí chuyển khoản ref: %s", paymentTransaction.getCode()),
                    Created.ofEmpty(),
                    toPaymentTransaction.getPayment()
            );
            paymentTransactionService.create(paymentTransactionFee);

            payment.setBalance(payment.getBalance().add(transFee));
            //paymentService.create(payment);
        } else {
            money = money.add(transFee);
        }

        if (toPaymentTransaction.getBeneficiary().isInternal()) {
            PaymentTransaction receiptTransaction = new PaymentTransaction(
                    RandomUtils.generateTransactionCode(),
                    money,
                    toPaymentTransaction.getContent(),
                    Created.ofEmpty(),
                    toPaymentTransaction.getBeneficiary().getPayment()
            );
            paymentTransactionService.create(receiptTransaction);

            Payment receiptPayment = toPaymentTransaction.getBeneficiary().getPayment();
            receiptPayment.setBalance(receiptPayment.getBalance().add(money));
            paymentService.update(toPaymentTransaction.getBeneficiary().getPayment(), receiptPayment);
        } else {
            Partner partner = partnerService.findByName(toPaymentTransaction.getBeneficiary().getBankName());
            if (!partner.isEmpty()){
                MerchantCriteria merchantCriteria = new MerchantCriteria(partner, toPaymentTransaction.getBeneficiary().getAccount(), toPaymentTransaction.getContent(), money, toPaymentTransaction.getPayment().getAccount());
                MerchantDeposit merchantDeposit = merchantService.deposit(merchantCriteria);
                if (merchantDeposit.isEmpty()){
                    throw new BankingServiceException("Could not transfer money");
                }
            }
        }

        paymentService.update(toPaymentTransaction.getPayment(), payment);

        if (!debitId.equals(Long.MIN_VALUE)) {
            Debit debit = debitService.findById(debitId);
            debit.setStatus(1);
            debit.setPaymentTransaction(paymentTransaction);

            Credit credit = debit.getCredit();
            credit.setStatus(1);
            creditService.create(credit);
            debitService.create(debit);

            Notification notification = new Notification(
                    String.format("%s %s", credit.getCustomer().getInfo().getFirstName(), credit.getCustomer().getInfo().getLastName()),
                    String.format("%s %s", credit.getContent(), "[Paid]"),
                    LocalDateTime.now()
            );
            notificationService.notify(notification, credit.getDebit().getCustomer().getInfo().getUser().getUsername());

        }
    }

    @Transactional
    public void deposit(PaymentTransaction paymentTransaction) {
        if (paymentTransaction.getMoney().signum() <= 0) {
            throw new BankingServiceException("Money must be greater than zero");
        }
        paymentTransaction.setCode(RandomUtils.generateTransactionCode());
        paymentTransactionService.create(paymentTransaction);

        Payment payment = paymentTransaction.getPayment();
        payment.setBalance(payment.getBalance().add(paymentTransaction.getMoney()));
        paymentService.create(payment);
    }

    @Transactional
    public void externalPayment(PaymentTransaction paymentTransaction, Partner partner) {
        if (paymentTransaction.getMoney().signum() == 0) {
            throw new BankingServiceException("Money is zero");
        }
        Payment payment = paymentTransaction.getPayment();
        payment.setBalance(payment.getBalance().add(paymentTransaction.getMoney()));
        if (payment.getBalance().signum() < 0) {
            throw new BankingServiceException("Not enough money");
        }

        paymentTransaction.setCode(RandomUtils.generateTransactionCode());
        paymentTransaction.setPartner(partner);
        paymentTransactionService.create(paymentTransaction);

        paymentService.create(payment);
    }

    public Page<PaymentTransaction> findAllByPartner(String partnerName, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        if (Objects.isNull(partnerName) && Objects.isNull(startDate) && Objects.isNull(endDate)) {
            return paymentTransactionService.findAllByPartners(pageable);
        }
        if (Objects.nonNull(partnerName) && Objects.isNull(startDate) && Objects.isNull(endDate)) {
            return paymentTransactionService.findAllByPartnerName(partnerName, pageable);
        }
        if (Objects.isNull(partnerName) && Objects.nonNull(startDate) && Objects.nonNull(endDate)) {
            return paymentTransactionService.findAllByDate(new CreatedAt(startDate.atStartOfDay()), new CreatedAt(endDate.atStartOfDay()), pageable);
        }

        return paymentTransactionService.findAllByPartner(partnerName, new CreatedAt(startDate.atStartOfDay()), new CreatedAt(endDate.atStartOfDay()), pageable);
    }
}
