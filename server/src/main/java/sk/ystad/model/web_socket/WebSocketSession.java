package sk.ystad.model.web_socket;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.messaging.MessageHeaders;

import java.util.ArrayList;
import java.util.List;

public class WebSocketSession {

    private String sessionId;
    private final List<WebSocketSubscription> subscriptions;
    private MessageHeaders messageHeader;

    public WebSocketSession(String sessionId, MessageHeaders messageHeaders) {
        this.sessionId = sessionId;
        subscriptions = new ArrayList<>();
        this.messageHeader = messageHeaders;
    }


    public List<WebSocketSubscription> getSubscriptions() {
        return subscriptions;
    }

    public String getSessionId() {
        return sessionId;
    }

    public MessageHeaders getMessageHeader() {
        return messageHeader;
    }

    public void addSubscriptions(JSONArray subscribeArray) throws JSONException {
        for (int i = 0; i < subscribeArray.length(); i++) {
            addSubscription(subscribeArray.getJSONObject(i));
        }
    }

    private void addSubscription(JSONObject subscriptionJson) throws JSONException {
        String event = subscriptionJson.getString("event");
        if ("portfolios_change".equals(event)) {
            WebSocketSubscription subscription = findSubscription(event);
            if (subscription == null) {
                subscription = new WebSocketSubscription(event);
                addSubToList(subscription);
            }
        }
    }

    private void addSubToList(WebSocketSubscription subscription) {
        synchronized (this.subscriptions) {
            subscriptions.add(subscription);
        }
    }

    private WebSocketSubscription findSubscription(String event) {
        synchronized (this.subscriptions) {
            for (WebSocketSubscription subscription : subscriptions) {
                if (event.equals(subscription.getEvent())) {
                    return subscription;
                }
            }
        }
        return null;
    }

    public boolean isSubscribedToPortfolio(long portfolioId) {
        synchronized (this.subscriptions) {
            for (WebSocketSubscription subscription : subscriptions) {
                if(subscription.getEvent().equals("portfolios_change")){
                    return true;
                }
            }
        }
        return false;
    }
}
