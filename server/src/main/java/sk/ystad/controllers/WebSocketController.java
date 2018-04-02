package sk.ystad.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void onReceivedMessage(String message, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.setLeaveMutable(true);
        this.template.convertAndSendToUser(headerAccessor.getSessionId(), "/queue/messages", new SimpleDateFormat("HH:mm:ss").format(new Date())+"- " + message, headerAccessor.getMessageHeaders());
    }
}
