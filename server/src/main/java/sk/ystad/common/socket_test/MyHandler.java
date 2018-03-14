package sk.ystad.common.socket_test;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import sk.ystad.ServerApplication;

public class MyHandler  extends TextWebSocketHandler {

    private static final Logger logger = LogManager
            .getLogger(MyHandler.class);
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        logger.error("nieco doslo shiiit " + message.getPayload());
        // ...
    }
}
