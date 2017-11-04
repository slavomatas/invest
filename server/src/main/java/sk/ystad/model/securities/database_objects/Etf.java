package sk.ystad.model.securities.database_objects;

import javax.persistence.*;

@Entity
public class Etf extends SecurityData {

    public Etf() {
    }

    public Etf(String symbol, String name) {
        super(symbol, name);
    }

}
