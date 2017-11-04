package sk.ystad.model.securities.database_objects;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

//@Entity
public class Attribute implements Serializable {

    private static final long serialVersionUID = -1867462836467835799L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long attributeId;

    private String key;

    private String value;

//    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "attributes")
//    private Set<Security> securities;


    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

//    public Set<Security> getSecurities() {
//        return securities;
//    }
//
//    public void setSecurities(Set<Security> securities) {
//        this.securities = securities;
//    }
}
