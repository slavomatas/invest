package sk.ystad.model.securities.database_objects;

import javax.persistence.*;

@Entity
@DiscriminatorColumn(name = "securityType")
public class Etf extends SecurityData {

    public Etf() {
    }

    public Etf(String symbol, String name) {
        super(symbol, name);
    }

}
