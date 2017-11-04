package sk.ystad.model.securities.database_objects;

import org.hibernate.annotations.*;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity
public class Security implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long securityId;

    @Transient  //Here should be probably custom join
    //@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="security")
    private SecurityData securityData;

    private String symbol;

    private String name;

    private String currency;

    private boolean isActive;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="security")
    private List<ExternalSecurity> externalIds;

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

    public SecurityData getSecurityData() {
        return securityData;
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

    public List<ExternalSecurity> getExternalIds() {
        return externalIds;
    }
}
