package sk.ystad.model.securities;

import org.apache.commons.csv.CSVRecord;
import sk.ystad.common.utils.FormatingUtil;

import javax.persistence.*;
import java.text.ParseException;
import java.util.Date;

@Entity
@DiscriminatorColumn(name = "securityType")
public class Etf extends SecurityData {

    private long csiNumber;

    @Temporal(TemporalType.DATE)
    private Date startDate;
    //
    @Temporal(TemporalType.DATE)
    private Date endDate;

    private String sector;

    private String industry;

    private String category;

    private String exchange;


    protected Etf() {
    }

    public Etf(String symbol, String name) {
        super(symbol, name);
    }

    private Etf(CSVRecord csvRecord) throws ParseException {
        this(csvRecord.get("Symbol"), csvRecord.get("Name"));
        this.csiNumber = Long.parseLong(csvRecord.get("CsiNumber"));
        this.startDate = FormatingUtil.formatStringToDate(csvRecord.get("StartDate"), "yyyy-MM-dd");
        this.endDate = FormatingUtil.formatStringToDate(csvRecord.get("EndDate"), "yyyy-MM-dd");
        this.sector = csvRecord.get("Sector");
        this.industry = csvRecord.get("Industry");
        this.exchange = csvRecord.get("Exchange");

        this.getSecurity().setActive(Integer.parseInt(csvRecord.get("IsActive")) == 1);
        this.getSecurity().setCurrency(csvRecord.get("Currency"));
    }


    @Override
    public String toString() {
        return getSecurity().getName() + ", " + getSecurity().getSymbol();
    }

    public long getCsiNumber() {
        return csiNumber;
    }

    public void setCsiNumber(long csiNumber) {
        this.csiNumber = csiNumber;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public static class EtfBuilder {
        public Etf buildFromCsv(CSVRecord csvRecord) throws ParseException {
            Etf etf = new Etf(csvRecord);
            try {
                if (etf.getSecurity().isActive() && ("AMEX".equals(etf.getExchange()) ||
                        "NYSE".equals(etf.getExchange()) || "OTC".equals(etf.getExchange()))) {
                    return etf;
                } else {
                    return null;
                }
            } catch (NullPointerException e) {
                return null;
            }
        }
    }
}
