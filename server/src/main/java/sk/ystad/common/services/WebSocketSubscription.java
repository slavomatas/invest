package sk.ystad.common.services;

public class WebSocketSubscription {
    private String event;
    private SubscriptionData data;

    public WebSocketSubscription(String event) {
        this.event = event;
    }

    public String getEvent() {
        return event;
    }

    public SubscriptionData getData() {
        return data;
    }
}
