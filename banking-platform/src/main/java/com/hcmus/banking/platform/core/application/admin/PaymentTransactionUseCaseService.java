package com.hcmus.banking.platform.core.application.admin;

import com.hcmus.banking.platform.core.application.beneficiary.BeneficiaryService;
import com.hcmus.banking.platform.core.application.mail.MailService;
import com.hcmus.banking.platform.core.application.otp.OtpService;
import com.hcmus.banking.platform.core.application.payment.PaymentService;
import com.hcmus.banking.platform.core.application.paymentTransaction.PaymentTransactionService;
import com.hcmus.banking.platform.core.utils.RandomUtils;
import com.hcmus.banking.platform.domain.beneficiary.Beneficiary;
import com.hcmus.banking.platform.domain.exception.BankingServiceException;
import com.hcmus.banking.platform.domain.exception.NotFoundException;
import com.hcmus.banking.platform.domain.general.Created;
import com.hcmus.banking.platform.domain.mail.Mail;
import com.hcmus.banking.platform.domain.otp.OTP;
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

    @Transactional(readOnly = true)
    public Page<PaymentTransaction> findAllBy(Pageable pageable) {
        return paymentTransactionService.findAllBy(pageable);
    }

    @Transactional(readOnly = true)
    public PaymentTransaction findById(Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        if (paymentTransaction.isEmpty()) {
            throw new NotFoundException();
        }
        return paymentTransaction;
    }

    @Transactional
    public void delete(Long id) {
        PaymentTransaction paymentTransaction = paymentTransactionService.findById(id);
        if (paymentTransaction.isEmpty()) {
            throw new NotFoundException();
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
    public Page<PaymentTransaction> findAllByBeneficiary(Long id, Pageable pageable) {
        Beneficiary beneficiary = beneficiaryService.findById(id);
        if (beneficiary.isEmpty()) {
            throw new BankingServiceException("Beneficiary does not exist!!!");
        }
        return paymentTransactionService.findAllByBeneficiary(id, pageable);
    }

    @Transactional
    public PaymentTransaction payment(PaymentTransaction paymentTransaction, User user) {
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

        PaymentTransaction paymentTransaction = new PaymentTransaction(
                RandomUtils.generateTransactionCode(),
                BigDecimal.ZERO.subtract(toPaymentTransaction.getMoney()),
                toPaymentTransaction.getContent(),
                Created.ofEmpty(),
                toPaymentTransaction.getPayment(),
                toPaymentTransaction.getBeneficiary()
        );

        paymentTransactionService.create(paymentTransaction);
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
        } else {
            money = money.add(PaymentTransaction.internalFee());
        }

        PaymentTransaction receiptTransaction = new PaymentTransaction(
                RandomUtils.generateTransactionCode(),
                money,
                toPaymentTransaction.getContent(),
                Created.ofEmpty(),
                toPaymentTransaction.getBeneficiary().getPayment()
        );
        paymentTransactionService.create(receiptTransaction);


    }

    @Transactional
    public void deposit(PaymentTransaction paymentTransaction) {
        if (paymentTransaction.getMoney().signum() <= 0){
            throw new BankingServiceException("Money must be greater than zero");
        }
        paymentTransaction.setCode(RandomUtils.generateTransactionCode());
        paymentTransactionService.create(paymentTransaction);
    }
}
