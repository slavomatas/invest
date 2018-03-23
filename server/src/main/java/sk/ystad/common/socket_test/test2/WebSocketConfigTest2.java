package sk.ystad.common.socket_test.test2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


/**
var sock = new SockJS('http://localhost:8080/greeting');

sock.onmessage = function(e) {
    console.log('message', e.data);
}

 * @author Kevendra Patidar
 *
 */
@Configuration
@EnableWebSocket
public class WebSocketConfigTest2 implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(greetingHandler(), "/socket").setAllowedOrigins("*").withSockJS();
        registry.addHandler(textHandler(), "/chat");
    }

    @Bean
    public WebSocketHandler greetingHandler() {
        return new GreetingHandler();
    }
    @Bean
    public WebSocketHandler textHandler() {
        return new TextHandler();
    }
}
