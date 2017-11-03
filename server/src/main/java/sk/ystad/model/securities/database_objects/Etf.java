package sk.ystad.model.securities.database_objects;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "securityType")
public class Etf implements SecurityData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long securityDataId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "securityId")
    @MapsId
    private Security security;

    public Etf() {
        this.security = new Security(this);
    }

    public Etf(String symbol, String name) {
        this.security = new Security(this, symbol, name);
    }

    @Override
    public Security getSecurity() {
        return security;
    }
}
