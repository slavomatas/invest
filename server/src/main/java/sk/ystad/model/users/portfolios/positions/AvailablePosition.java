package sk.ystad.model.users.portfolios.positions;

import javax.persistence.*;

@Entity
public class AvailablePosition {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(name = "symbol")
    private String symbol;

    public Long getId() {
        return id;
    }

    public String getSymbol() {
        return symbol;
    }


}
