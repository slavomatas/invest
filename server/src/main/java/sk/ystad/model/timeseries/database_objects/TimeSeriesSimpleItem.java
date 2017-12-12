package sk.ystad.model.timeseries.database_objects;

public class TimeSeriesSimpleItem {

    private String name;
    private String value;

    public TimeSeriesSimpleItem(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
