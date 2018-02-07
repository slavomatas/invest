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

//
//    public Long getTradeId() {
//        return tradeId;
//    }
//
//    public Position getPosition() {
//        return position;
//    }
}
