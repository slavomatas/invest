package sk.ystad.model.securities.database_objects;

import java.util.Date;
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Option extends SecurityData {

    private Double strike;
    private Date expiry;
    private ExcerciseStyle excerciseStyle;
    private PayoffProfile payoffProfile;
    private Security underlyingSecurity;

    public Option(){
    }

    public Option(String symbol, String name, Double strike, Date expiry, ExcerciseStyle excerciseStyle,
                  PayoffProfile payoffProfile, Security underlyingSecurity) {
        super(symbol, name);
        this.strike = strike;
        this.expiry = expiry;
        this.excerciseStyle = excerciseStyle;
        this.payoffProfile = payoffProfile;
        this.underlyingSecurity = underlyingSecurity;
    }

    public Double getStrike() {
        return strike;
    }

    public void setStrike(Double strike) {
        this.strike = strike;
    }

    public Date getExpiry() {
        return expiry;
    }

    public void setExpiry(Date expiry) {
        this.expiry = expiry;
    }

    public ExcerciseStyle getExcerciseStyle() {
        return excerciseStyle;
    }

    public void setExcerciseStyle(ExcerciseStyle excerciseStyle) {
        this.excerciseStyle = excerciseStyle;
    }

    public PayoffProfile getPayoffProfile() {
        return payoffProfile;
    }

    public void setPayoffProfile(PayoffProfile payoffProfile) {
        this.payoffProfile = payoffProfile;
    }

    public Security getUnderlyingSecurity() {
        return underlyingSecurity;
    }

    public void setUnderlyingSecurity(Security underlyingSecurity) {
        this.underlyingSecurity = underlyingSecurity;
    }
}