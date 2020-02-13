package com.hcmus.banking.platform.domain.mail;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.MessageFormat;

@AllArgsConstructor
@Data
public class Mail {
    private String subject;
    private String receiver;
    private String content;

    public static Mail otpTemplate(String receiver, String name, String subject, String code) {
        return new Mail(
                subject,
                receiver,
                MessageFormat.format(
                        "<p> Dear {0}, </p>" +
                                "<p> We received a request to reset your password for your account: {1}</p>" +
                                "<p> Your verification code is </p>" +
                                "<p><b> {2} </b></p>" +
                                "<p> This code will expire 15 minutes after this email was sent! </p>" +
                                "<p> If you did not make this request, you can ignore this email. </p>",
                        name, receiver, code
                )
        );
    }

    public static Mail paymentTemplate(String receiver, String name, String subject, String code, BigDecimal money, String account, String beneficiaryAccount) {
        DecimalFormat df = new DecimalFormat("#,###.00");
        return new Mail(
                subject,
                receiver,
                MessageFormat.format(
                        "<p> Dear {0}, </p>" +
                                "<p> We received a request to transfer money of your account: {1}</p>" +
                                "<p> Amount: {3} vnđ </p>" +
                                "<p> Transfer to: {4} </p>" +
                                "<p> Your verification code is </p>" +
                                "<p><b> {2} </b></p>" +
                                "<p> This code will expire 15 minutes after this email was sent! </p>" +
                                "<p> If you did not make this request, you can ignore this email. </p>",
                        name, account, code, df.format(money), beneficiaryAccount
                )
        );
    }
}
