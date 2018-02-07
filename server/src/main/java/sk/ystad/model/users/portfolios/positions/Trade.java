package sk.ystad.model.users.portfolios.positions;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "trades")
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "tradeId")
    private Long tradeId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "positionId", referencedColumnName = "positionId")
    private UserPosition position;

    private double price;

    private int amount;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    public Trade() {
    }

    public Trade(UserPosition position, double price, int amount, Date dateTime) {
        this.position = position;
        this.price = price;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    public Long getTradeId() {
        return tradeId;
    }

    public void setTradeId(Long tradeId) {
        this.tradeId = tradeId;
    }

    public UserPosition getPosition() {
        return position;
    }

    public void setPosition(UserPosition position) {
        this.position = position;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
}
