package sk.ystad.model.users.portfolios;

public class Returns {
    private Double daily;
    private Double weekly;
    private Double monthly;
    private Double quarterly;
    private Double yearly;
    private Double cumulative;

    public Returns() {}

    public Returns(Double daily,
                   Double weekly,
                   Double monthly,
                   Double quarterly,
                   Double yearly,
                   Double cumulative) {
        this.daily = daily;
        this.weekly = weekly;
        this.monthly = monthly;
        this.quarterly = quarterly;
        this.yearly = yearly;
        this.cumulative = cumulative;
    }

    public Double getDaily() {
        return daily;
    }

    public void setDaily(Double daily) {
        this.daily = daily;
    }

    public Double getWeekly() {
        return weekly;
    }

    public void setWeekly(Double weekly) {
        this.weekly = weekly;
    }

    public Double getMonthly() {
        return monthly;
    }

    public void setMonthly(Double monthly) {
        this.monthly = monthly;
    }

    public Double getQuarterly() {
        return quarterly;
    }

    public void setQuarterly(Double quarterly) {
        this.quarterly = quarterly;
    }

    public Double getYearly() {
        return yearly;
    }

    public void setYearly(Double yearly) {
        this.yearly = yearly;
    }

    public Double getCumulative() {
        return cumulative;
    }

    public void setCumulative(Double cumulative) {
        this.cumulative = cumulative;
    }
}
