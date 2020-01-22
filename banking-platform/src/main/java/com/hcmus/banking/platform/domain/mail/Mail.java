package com.hcmus.banking.platform.domain.mail;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.text.MessageFormat;

@AllArgsConstructor
@Data
public class Mail {
    private String subject;
    private String receiver;
    private String content;

    public Mail(String receiver, String name, String subject, String code){
        this.subject = subject;
        this.receiver = receiver;
        this.content = MessageFormat.format(
                "<p> Dear {0}, </p>" +
                        "<p> We received a request to reset your password for your account: {1}</p>" +
                        "<p> Your verification code is </p>" +
                        "<p><b> {2} </b></p>" +
                        "<p> This code will expire 15 minutes after this email was sent! </p>" +
                        "<p> If you did not make this request, you can ignore this email. </p>",
                name, receiver, code
        );
    }
}
