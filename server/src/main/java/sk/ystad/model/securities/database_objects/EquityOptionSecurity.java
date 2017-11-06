package sk.ystad.model.securities.database_objects;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class EquityOptionSecurity extends Option{
    protected EquityOptionSecurity(){
    }

    public EquityOptionSecurity(String symbol, String name, Double strike, Date expiry, ExcerciseStyle excerciseStyle,
                                      PayoffProfile payoffProfile, Security underlyingSecurity){
        super(symbol, name, strike, expiry, excerciseStyle, payoffProfile, underlyingSecurity);
    }
}
