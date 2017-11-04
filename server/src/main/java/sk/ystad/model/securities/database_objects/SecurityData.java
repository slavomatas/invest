package sk.ystad.model.securities.database_objects;

import javax.persistence.*;
import java.io.Serializable;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class SecurityData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long securityDataId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "securityId")
    @MapsId
    private Security security;

    public SecurityData() {
        this.security = new Security(this);
    }

    public SecurityData(String symbol, String name) {
        this.security = new Security(this, symbol, name);
    }

    public Security getSecurity() {
        return security;
    }
}
