package sk.ystad.model.securities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.csv.CSVRecord;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Access(AccessType.PROPERTY)
public class Security implements Serializable {

    private Long securityId;

    @JsonIgnore
    private SecurityData securityData;

    @Column(name = "symbol")
    @NotEmpty(message = "Attribute symbol cannot be empty")
    private String symbol;

    @NotEmpty(message = "Attribute name cannot be empty")
    private String name;

    @NotEmpty(message = "Attribute currency cannot be empty")
    private String currency;

    private boolean isActive;


    @JsonIgnore
    private List<ExternalSecurity> externalIds = new ArrayList<>();

//    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinTable(name = "securities_attributes", joinColumns = {
//            @JoinColumn(name = "security_id", nullable = false, updatable = false)},
//            inverseJoinColumns = {@JoinColumn(name = "attribute_id", nullable = false, updatable = false)})
//    private Set<Attribute> attributes;

    protected Security(){
        setCurrency("USD"); //temporary implementation - later will be parameter in constructor?(SMA)
    }

    protected Security(SecurityData securityData) {
        this();
        this.securityData = securityData;
    }

    public Security(SecurityData securityData, String symbol, String name) {
        this(securityData);
        setSymbol(symbol);
        setName(name);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long getSecurityId() {
        return securityId;
    }

    private void setSecurityId(Long securityId) {
        this.securityId = securityId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="security")
    public List<ExternalSecurity> getExternalIds() {
        return externalIds;
    }

    private void setExternalIds(List<ExternalSecurity> externalIds) {
        this.externalIds = externalIds;
    }

    @Transient
    public SecurityData getSecurityData() {
        return securityData;
    }

    private void setSecurityData(SecurityData securityData) {
        if (securityData != null)
            this.securityData = securityData;
    }

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy="security")
    private Etf getEtf(){
        return securityData instanceof Etf ? (Etf) securityData : null;
    }

    private void  setEtf(Etf seurityData){
        setSecurityData(seurityData);
    }

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy="security")
    private Option getOption(){
        return securityData instanceof Option ? (Option) securityData : null;
    }

    private void  setOption(Option seurityData){
        setSecurityData(seurityData);
    }

    public static class SecurityBuilder {

        public Security buildEtfFromCsv(CSVRecord csvRecord) {
           return null;
        }
    }
}
