package com.hcmus.banking.platform.domain.notification;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class Notification {
    private String sender;
    private String message;
    private LocalDateTime time;
}
