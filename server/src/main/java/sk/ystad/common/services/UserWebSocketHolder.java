package sk.ystad.common.services;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.List;

public class UserWebSocketHolder {

    private final List<WebSocketSession> sessions;

    public UserWebSocketHolder() {
        sessions = new ArrayList<>();
    }

    public void addSubscriptions(JSONArray subscribeArray, String sessionId, MessageHeaders messageHeaders) throws JSONException {
        WebSocketSession demmandedSession = findSesstion(sessionId);
        if (demmandedSession == null) {
            demmandedSession = new WebSocketSession(sessionId, messageHeaders);
            synchronized (this.sessions) {
                this.sessions.add(demmandedSession);
            }
        }
        demmandedSession.addSubscriptions(subscribeArray);

    }

    private WebSocketSession findSesstion(String sessionId) {
        synchronized (this.sessions) {
            for (WebSocketSession session : sessions) {
                if (sessionId.equals(session.getSessionId())) {
                    return session;
                }
            }
        }
        return null;
    }

    public void notifyUserAboutPortfolio(SimpMessagingTemplate template, long portfolioId) {
        synchronized (this.sessions) {
            for (WebSocketSession session : sessions) {
                if (session.isSubscribedToPortfolio(portfolioId)) {
                    System.out.println(session.getSessionId() + " " + template);
                    template.convertAndSendToUser(session.getSessionId(), "/queue/messages", "some message here", session.getMessageHeader());
                }
            }
        }
    }
}
