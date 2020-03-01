package com.hcmus.banking.platform.core.presentation.notification;

import com.hcmus.banking.platform.domain.notification.Notification;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.time.LocalDateTime;

@Controller
public class NotificationController {
    @MessageMapping("/notification")
    @SendToUser("/queue/notification")
    public Notification notify(Notification notification, Principal principal) {
        return new Notification(principal.getName(), notification.getMessage(), LocalDateTime.now());
    }

    @MessageMapping("/topic/notification/{username}")
    @SendTo("/topic/notification/{username}")
    public Notification topicNotify(Notification notification, @DestinationVariable("username") String username, Principal principal) {
        return new Notification(username, notification.getMessage(), LocalDateTime.now());
    }
}
