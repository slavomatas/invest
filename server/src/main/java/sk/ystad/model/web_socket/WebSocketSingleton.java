package sk.ystad.model.web_socket;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.messaging.MessageHeaders;

import java.util.HashMap;
import java.util.Map;

public class WebSocketSingleton {

    private static WebSocketSingleton instance = null;

    private final Map<String, UserWebSocketHolder> sockets;


    private WebSocketSingleton() {
        sockets = new HashMap<>();
    }

    public static WebSocketSingleton getInstance() {
        if (instance == null) {
            instance = new WebSocketSingleton();
        }
        return instance;
    }


    public void addSubscriptions(String email, JSONArray subscribeArray, String sessionId, MessageHeaders messageHeaders) throws JSONException {
        UserWebSocketHolder userSockets = getSocket(email);
        if (userSockets == null) {
            userSockets = new UserWebSocketHolder();
            synchronized (this.sockets) {
                sockets.put(email, userSockets);
            }
        }
        userSockets.addSubscriptions(subscribeArray, sessionId, messageHeaders);
    }

    private UserWebSocketHolder getSocket(String email) {
        synchronized (this.sockets) {
            return sockets.get(email);
        }
    }

    public UserWebSocketHolder getUserSockets(String email) {
        synchronized (this.sockets) {
            return sockets.get(email);
        }
    }

    public void removeSessionBySessionId(String sessionId) {
        synchronized (this.sockets) {
            for (String key : sockets.keySet()) {
                if (sockets.get(key).removeSession(sessionId)) {
                    break;
                }
            }
        }
    }

}
