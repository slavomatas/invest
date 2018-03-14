package sk.ystad.common.socket_test.test2;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class GreetingHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        TextMessage msg = new TextMessage("HelloGreeting, " + message.getPayload() + "!");
        session.sendMessage(msg);
    }
}