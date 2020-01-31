package com.hcmus.banking.platform.core.presentation.notification;

import com.hcmus.banking.platform.domain.notification.Notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {
    @MessageMapping("/notification")
    @SendToUser("/queue/notification")
    public Notification notify(Notification notification) {
        return notification;
    }
}
