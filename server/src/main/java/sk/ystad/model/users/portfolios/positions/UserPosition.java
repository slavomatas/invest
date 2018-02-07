package sk.ystad.model.users.portfolios.positions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import sk.ystad.model.securities.Security;
import sk.ystad.model.users.portfolios.Portfolio;

import javax.persistence.*;
import java.util.List;

@Entity
public class UserPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "positionId")
    private Long positionId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "security_id", nullable = false)
    private Security security;

    @OneToMany(mappedBy = "position")
    private List<Trade> trades;

    private Portfolio portfolio;

    public UserPosition(Portfolio portfolio) {

    }

    public Long getPositionId() {
        return positionId;
    }

    public Security getSecurity() {
        return security;
    }

    public List<Trade> getTrades() {
        return trades;
    }


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id")
    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public void setSecurity(Security security) {
        this.security = security;
    }

    public void setTrades(List<Trade> trades) {
        this.trades = trades;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }
}
