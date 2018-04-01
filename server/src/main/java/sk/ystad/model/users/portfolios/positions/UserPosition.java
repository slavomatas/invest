package sk.ystad.model.users.portfolios.positions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import sk.ystad.model.securities.Security;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;
import sk.ystad.model.users.portfolios.Portfolio;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "positions")
public class UserPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "positionId")
    private Long positionId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "securityId", referencedColumnName = "securityId")
    private Security security;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "position")
    private List<Trade> trades;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "portfolioId", referencedColumnName = "id")
    @JsonIgnore
    private Portfolio portfolio;

    @Transient
    private Double marketValue;
    @Transient
    private Double lastChangeMarketValue;

    @Transient
    private List<TimeSeriesSimpleItem> priceLast20Days;

    public UserPosition() {
        trades = new ArrayList<>();
    }

    public UserPosition(Security security, List<Trade> trades, Portfolio portfolio) {
        this.security = security;
        this.trades = trades;
        this.portfolio = portfolio;
    }

    public UserPosition(Portfolio portfolio, Security security) {
        this.portfolio = portfolio;
        this.security = security;
    }

    public Long getPositionId() {
        return positionId;
    }

    public Security getSecurity() {
        return security;
    }

    public void setSecurity(Security security) {
        this.security = security;
    }

//    public List<Trade> getTrades() {
//        return trades;
//    }


    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }


    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public List<Trade> getTrades() {
        return trades;
    }

    public void setTrades(List<Trade> trades) {
        this.trades = trades;
    }

    public void addTrade(Trade trade) {
        trades.add(trade);
    }

    public List<TimeSeriesSimpleItem> getPriceLast20Days() {
        return priceLast20Days;
    }

    public void setPriceLast20Days(List<TimeSeriesSimpleItem> priceLast20Days) {
        this.priceLast20Days = priceLast20Days;
    }

    public Double getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(Double marketValue) {
        this.marketValue = marketValue;
    }

    public Double getLastChangeMarketValue() {
        return lastChangeMarketValue;
    }

    public void setLastChangeMarketValue(Double lastChangeMarketValue) {
        this.lastChangeMarketValue = lastChangeMarketValue;
    }
}
