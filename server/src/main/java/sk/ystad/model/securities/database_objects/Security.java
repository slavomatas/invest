package sk.ystad.model.securities.database_objects;

import org.hibernate.annotations.Type;
import org.json.JSONObject;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity(name = "Security")
@Table(name = "securities")
public class Security implements Serializable {

    private static final long serialVersionUID = 7178589967236604342L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long securityId;

    @Column(name = "symbol", unique = true)
    private String symbol;

    @Column(name = "name")
    private String name;

    @Column(name = "is_active")
    private boolean isActive;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "securities_attributes", joinColumns = {
            @JoinColumn(name = "security_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "attribute_id", nullable = false, updatable = false)})
    private Set<Attribute> attributes;

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

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

}
