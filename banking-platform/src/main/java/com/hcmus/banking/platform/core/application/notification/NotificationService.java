package com.hcmus.banking.platform.core.application.notification;

import com.hcmus.banking.platform.domain.notification.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void notify(Notification notification, String username) {
        messagingTemplate.convertAndSendToUser(
                username,
                "/queue/notification",
                notification
        );
        messagingTemplate.convertAndSend(String.format("%s%s", "/topic/notification/", username), notification);
    }
}
