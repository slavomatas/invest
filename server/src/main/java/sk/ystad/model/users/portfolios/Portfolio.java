package sk.ystad.model.users.portfolios;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.NotEmpty;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "portfolios")
public class Portfolio {

    private Long id;

    @NotEmpty(message = "Attribute name cannot be empty")
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Transient
    private double marketValue;

    @Transient
    private double lastChangeAbs;

    @Transient
    private double lastChangePct;

    @Transient
    private Returns returns;

    @Transient
    private double cash;

    @Transient
    private List<Position> positions;

    private List<UserPosition> usersPositions;

    @JsonIgnore
    private User user;

    @JsonIgnore
    @Column(name = "id_influx")
    private String idInflux;

    @JsonIgnore
    @Column(name = "new_id_influx")
    private String newIdInflux;

    @Column(name = "is_closed")
    private boolean isClosed;

    @Column(name = "is_model", nullable = false, columnDefinition="boolean default false")
    private boolean isModel;

    public Portfolio(Long id, String name, String description, double marketValue, double lastChangeAbs, double lastChangePct, Returns returns, double cash, List<Position> positions, List<UserPosition> usersPositions, User user, String idInflux, boolean isClosed, boolean isModel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.marketValue = marketValue;
        this.lastChangeAbs = lastChangeAbs;
        this.lastChangePct = lastChangePct;
        this.returns = returns;
        this.cash = cash;
        this.positions = positions;
        this.usersPositions = usersPositions;
        this.user = user;
        this.idInflux = idInflux;
        this.isClosed = isClosed;
        this.isModel = isModel;
    }

    public  Portfolio(){

    }

    public Portfolio(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Portfolio(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public Portfolio(Long id, String name, User user, String idInflux) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.idInflux = idInflux;
    }

    public Portfolio(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getIdInflux() {
        return idInflux;
    }

    public void setIdInflux(String idInflux) {
        this.idInflux = idInflux;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Transient
    public double getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(double marketValue) {
        this.marketValue = marketValue;
    }

    @Transient
    public double getLastChangeAbs() {
        return lastChangeAbs;
    }

    public void setLastChangeAbs(double lastChangeAbs) {
        this.lastChangeAbs = lastChangeAbs;
    }

    @Transient
    public double getLastChangePct() {
        return lastChangePct;
    }

    public void setLastChangePct(double lastChangePct) {
        this.lastChangePct = lastChangePct;
    }

    @Transient
    public Returns getReturns() {
        return returns;
    }

    public void setReturns(Returns returns) {
        this.returns = returns;
    }

    @Transient
    public double getCash() {
        return cash;
    }

    public void setCash(double cash) {
        this.cash = cash;
    }

    @Transient
    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "portfolio")
    public List<UserPosition> getUsersPositions() {
        return usersPositions;
    }

    public void setUsersPositions(List<UserPosition> usersPositions) {
        this.usersPositions = usersPositions;
    }

    public boolean isClosed() {
        return isClosed;
    }

    public void setClosed(boolean closed) {
        isClosed = closed;
    }

    public boolean isModel() {
        return isModel;
    }

    public void setModel(boolean model) {
        isModel = model;
    }

    @Transient
    public List<Trade> getAllTrades() {
        List<Trade> trades = new ArrayList<>();
        for (UserPosition position : usersPositions) {
            trades.addAll(position.getTrades());
        }
        return trades;
    }

    public String getNewIdInflux() {
        return newIdInflux;
    }

    public void setNewIdInflux(String newIdInflux) {
        this.newIdInflux = newIdInflux;
    }
}