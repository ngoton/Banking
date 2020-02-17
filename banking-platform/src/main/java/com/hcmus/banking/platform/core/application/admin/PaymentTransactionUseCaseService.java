package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.beneficiary.BeneficiaryService;
import com.hcmus.banking.platform.core.application.mail.MailService;
import com.hcmus.banking.platform.core.application.otp.OtpService;
import com.hcmus.banking.platform.core.application.partner.PartnerService;
import com.hcmus.banking.platform.core.application.payment.PaymentService;
import com.hcmus.banking.platform.core.application.paymentTransaction.PaymentTransactionService;
import com.hcmus.banking.platform.core.utils.RandomUtils;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.mail.Mail;
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

@Service
@RequiredArgsConstructor
public class PaymentTransactionUseCaseService {
    private final PaymentTransactionService paymentTransactionService;
    private final PaymentService paymentService;
    private final BeneficiaryService beneficiaryService;
    private final OtpService otpService;
    private final MailService mailService;
    private final PartnerService partnerService;

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
        if (paymentTransaction.getMoney().signum() <= 0){
            throw new BankingServiceException("Money must be greater than zero");
        }
        Payment payment = paymentTransaction.getPayment();
        payment.setBalance(payment.getBalance().subtract(paymentTransaction.getMoney()));
        if (payment.getBalance().signum() < 0){
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
    public void paymentVerify(PaymentTransaction toPaymentTransaction, Boolean fee, String email, String code) {
        OTP otp = otpService.findByEmailAndCode(email, code);
        if (otp.isEmpty() || otp.isExpired()) {
            throw new BankingServiceException("OTP code is expired");
        }
        otpService.delete(otp);

        Payment payment = toPaymentTransaction.getPayment();
        payment.setBalance(payment.getBalance().subtract(toPaymentTransaction.getMoney()));
        if (payment.getBalance().signum() < 0){
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

        paymentService.create(payment);

        BigDecimal money = toPaymentTransaction.getMoney();
        if (fee) {
            PaymentTransaction paymentTransactionFee = new PaymentTransaction(
                    RandomUtils.generateTransactionCode(),
                    PaymentTransaction.internalFee(),
                    String.format("Phí Chuyển Khoản ref: %s", paymentTransaction.getCode()),
                    Created.ofEmpty(),
                    toPaymentTransaction.getPayment()
            );
            paymentTransactionService.create(paymentTransactionFee);

            payment.setBalance(payment.getBalance().add(PaymentTransaction.internalFee()));
            paymentService.create(payment);
        } else {
            money = money.add(PaymentTransaction.internalFee());
        }

        if (toPaymentTransaction.getBeneficiary().isInternal()){
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
            paymentService.create(payment);
        }


    }

    @Transactional
    public void deposit(PaymentTransaction paymentTransaction) {
        if (paymentTransaction.getMoney().signum() <= 0){
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
        if (paymentTransaction.getMoney().signum() == 0){
            throw new BankingServiceException("Money is zero");
        }
        Payment payment = paymentTransaction.getPayment();
        payment.setBalance(payment.getBalance().add(paymentTransaction.getMoney()));
        if (payment.getBalance().signum() < 0){
            throw new BankingServiceException("Not enough money");
        }

        paymentTransaction.setCode(RandomUtils.generateTransactionCode());
        paymentTransaction.setPartner(partner);
        paymentTransactionService.create(paymentTransaction);

        paymentService.create(payment);
    }
}