package sk.ystad.model.users.portfolios;

public class PortfolioSummary {
    private Double monthlyReturns;
    private Double weeklyReturns;
    private Double yearlyReturns;
    private Double allReturns;
    private Double cash;
    private Double lastChange;
    private Double lastChangePct;
    private Double actMarketValue;

    public PortfolioSummary(Double monthlyReturns,
                            Double weeklyReturns,
                            Double yearlyReturns,
                            Double allReturns,
                            Double cash,
                            Double lastChange,
                            Double lastChangePct,
                            Double actMarketValue) {
        this.monthlyReturns = monthlyReturns;
        this.weeklyReturns = weeklyReturns;
        this.yearlyReturns = yearlyReturns;
        this.allReturns = allReturns;
        this.cash = cash;
        this.lastChange = lastChange;
        this.lastChangePct = lastChangePct;
        this.actMarketValue = actMarketValue;
    }

    public Double getMonthlyReturns() {
        return monthlyReturns;
    }

    public void setMonthlyReturns(Double monthlyReturns) {
        this.monthlyReturns = monthlyReturns;
    }

    public Double getWeeklyReturns() {
        return weeklyReturns;
    }

    public void setWeeklyReturns(Double weeklyReturns) {
        this.weeklyReturns = weeklyReturns;
    }

    public Double getYearlyReturns() {
        return yearlyReturns;
    }

    public void setYearlyReturns(Double yearlyReturns) {
        this.yearlyReturns = yearlyReturns;
    }

    public Double getAllReturns() {
        return allReturns;
    }

    public void setAllReturns(Double allReturns) {
        this.allReturns = allReturns;
    }

    public Double getCash() {
        return cash;
    }

    public void setCash(Double cash) {
        this.cash = cash;
    }

    public Double getLastChange() {
        return lastChange;
    }

    public void setLastChange(Double lastChange) {
        this.lastChange = lastChange;
    }

    public Double getLastChangePct() {
        return lastChangePct;
    }

    public void setLastChangePct(Double lastChangePct) {
        this.lastChangePct = lastChangePct;
    }

    public Double getActMarketValue() {
        return actMarketValue;
    }

    public void setActMarketValue(Double actMarketValue) {
        this.actMarketValue = actMarketValue;
    }
}
