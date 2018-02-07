package sk.ystad.model.users.portfolios.positions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import sk.ystad.model.securities.Security;
import sk.ystad.model.users.portfolios.Portfolio;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "positions")
public class UserPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "positionId")
    private Long positionId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "securityId", referencedColumnName = "securityId")
    private Security security;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "position")
    private List<Trade> trades;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "portfolioId", referencedColumnName = "id")
    private Portfolio portfolio;

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
}
