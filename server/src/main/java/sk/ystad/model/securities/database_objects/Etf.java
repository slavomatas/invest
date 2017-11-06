package sk.ystad.model.securities.database_objects;

import org.apache.commons.csv.CSVRecord;

import javax.persistence.*;

@Entity
@DiscriminatorColumn(name = "securityType")
public class Etf extends SecurityData {

    protected Etf() {
    }

    public Etf(String symbol, String name) {
        super(symbol, name);
    }

    public static class EtfBuilder {
        public Etf buildFromCsv(CSVRecord csvRecord) {
            Etf result = new Etf(csvRecord.get("Symbol"), csvRecord.get("Name"));
            return result;
        }
    }

    @Override
    public String toString() {
        return getSecurity().getName() + ", " + getSecurity().getSymbol();
    }
}
