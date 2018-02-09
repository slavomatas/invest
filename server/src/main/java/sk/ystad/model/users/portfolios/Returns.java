package sk.ystad.model.users.portfolios;

public class Returns {
    private double daily;
    private double weekly;
    private double monthly;
    private double quarterly;
    private double yearly;
    private double cumulative;
    private double all;

    public Returns() {}

    public Returns(double daily, double weekly, double monthly, double quarterly, double yearly, double cumulative, double all) {
        this.daily = daily;
        this.weekly = weekly;
        this.monthly = monthly;
        this.quarterly = quarterly;
        this.yearly = yearly;
        this.cumulative = cumulative;
        this.all = all;
    }

    public double getDaily() {
        return daily;
    }

    public void setDaily(double daily) {
        this.daily = daily;
    }

    public double getWeekly() {
        return weekly;
    }

    public void setWeekly(double weekly) {
        this.weekly = weekly;
    }

    public double getMonthly() {
        return monthly;
    }

    public void setMonthly(double monthly) {
        this.monthly = monthly;
    }

    public double getQuarterly() {
        return quarterly;
    }

    public void setQuarterly(double quarterly) {
        this.quarterly = quarterly;
    }

    public double getYearly() {
        return yearly;
    }

    public void setYearly(double yearly) {
        this.yearly = yearly;
    }

    public double getCumulative() {
        return cumulative;
    }

    public void setCumulative(double cumulative) {
        this.cumulative = cumulative;
    }

    public double getAll() {
        return all;
    }

    public void setAll(double all) {
        this.all = all;
    }
}
