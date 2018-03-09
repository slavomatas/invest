package sk.ystad.model.kapacitor;

public class KapacitorAlert {

    private String id;
    private String message;
    private String details;
    private String time;
    private String duration;
    private Object data;
    private String level;
    private String previousLevel;

    public KapacitorAlert() {
    }

    public KapacitorAlert(String id, String message, String details, String time, String duration, Object data, String level, String previousLevel) {
        this.id = id;
        this.message = message;
        this.details = details;
        this.time = time;
        this.duration = duration;
        this.data = data;
        this.level = level;
        this.previousLevel = previousLevel;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getPreviousLevel() {
        return previousLevel;
    }

    public void setPreviousLevel(String previousLevel) {
        this.previousLevel = previousLevel;
    }
}
