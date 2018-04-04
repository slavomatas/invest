package sk.ystad.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import sk.ystad.common.services.WebSocketService;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;
    private final WebSocketService webSocketService;

    @Autowired
    WebSocketController(SimpMessagingTemplate template, WebSocketService webSocketService) {
        this.template = template;
        this.webSocketService = webSocketService;
    }

    @MessageMapping("/send/message")
    public void onReceivedMessage(String message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.setLeaveMutable(true);
        message = "{\"command\":\"subscribe_to\",\"values\":[{\"event\":\"portfolios_change\"},{\"event\":\"portfolio_change\",\"id\":\"10\"}]}";
        webSocketService.processMessage(message, headerAccessor);
        String sessionId = headerAccessor.getSessionId();
        System.out.println(sessionId + " " + template);
        this.template.convertAndSendToUser(sessionId, "/queue/messages", new SimpleDateFormat("HH:mm:ss").format(new Date()) + "- " + message, headerAccessor.getMessageHeaders());
        this.template.convertAndSendToUser(sessionId, "/queue/messages", new SimpleDateFormat("HH:mm:ss").format(new Date()) + "- " + message, headerAccessor.getMessageHeaders());
    }


}
