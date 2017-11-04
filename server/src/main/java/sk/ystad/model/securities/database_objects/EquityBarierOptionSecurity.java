package sk.ystad.model.securities.database_objects;

import javax.persistence.Entity;
import java.util.Date;

@Entity
public class EquityBarierOptionSecurity extends Option {
    private Double barierLevel;
    private String barrierType;
    private String barierDirection;
    private String monitoringType;
    private String samplingFrequency;

    public EquityBarierOptionSecurity(){
    }

    public EquityBarierOptionSecurity(String symbol, String name, Double strike, Date expiry, ExcerciseStyle excerciseStyle,
                                      PayoffProfile payoffProfile, Security underlyingSecurity, Double barierLevel,
                                      String barrierType, String barierDirection, String monitoringType,
                                      String samplingFrequency){
        super(symbol, name, strike, expiry, excerciseStyle, payoffProfile, underlyingSecurity);
        this.barierLevel = barierLevel;
        this.barrierType = barrierType;
        this.barierDirection = barierDirection;
        this.monitoringType = monitoringType;
        this.samplingFrequency = samplingFrequency;
    }

    public Double getBarierLevel() {
        return barierLevel;
    }

    public void setBarierLevel(Double barierLevel) {
        this.barierLevel = barierLevel;
    }

    public String getBarrierType() {
        return barrierType;
    }

    public void setBarrierType(String barrierType) {
        this.barrierType = barrierType;
    }

    public String getBarierDirection() {
        return barierDirection;
    }

    public void setBarierDirection(String barierDirection) {
        this.barierDirection = barierDirection;
    }

    public String getMonitoringType() {
        return monitoringType;
    }

    public void setMonitoringType(String monitoringType) {
        this.monitoringType = monitoringType;
    }

    public String getSamplingFrequency() {
        return samplingFrequency;
    }

    public void setSamplingFrequency(String samplingFrequency) {
        this.samplingFrequency = samplingFrequency;
    }
}
