package sk.ystad.model.web_socket;

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
                    template.convertAndSendToUser(session.getSessionId(), "/queue/messages",
                            "{\"command\":\"update_portfolio\", \"portfolio_id\":\"" + portfolioId +
                                    "\"}", session.getMessageHeader());
                }
            }
        }
    }

    public boolean removeSession(String sessionId) {
        synchronized (this.sessions) {
            for (int i = 0; i < sessions.size(); i++) {
                if (sessionId.equals(sessions.get(i).getSessionId())) {
                    sessions.remove(i);
                    return true;
                }
            }
        }
        return false;
    }

    public boolean hasSessions() {
        synchronized (this.sessions) {
            return sessions.size() > 0;
        }
    }
}
