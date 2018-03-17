package sk.ystad.model.users.portfolios.positions;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.util.Date;

@Entity
@Table(name = "trades")
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tradeId")
    private Long tradeId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "positionId", referencedColumnName = "positionId")
    @JsonIgnore
    private UserPosition position;

    @NotEmpty(message = "Attribute price cannot be empty")
    @Min(value = 0, message = "Attribute price must have positive value")
    private double price;

    private double amount;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    public Trade() {
    }

    public Trade(UserPosition position, double price, double amount, Date dateTime) {
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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
}
