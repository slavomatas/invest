package sk.ystad.model.securities;

import javax.persistence.*;

@Entity
public class ExternalSecurity{
    @EmbeddedId
    private ExternalSecurityId id;

    @ManyToOne(fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "securityId")
    private Security security;

    protected ExternalSecurity(){
        this.id = new ExternalSecurityId();
    }

    public ExternalSecurity(String externalDbName, String externalId, Security security)
    {
        this.id = new ExternalSecurityId(externalDbName, externalId);
        this.security = security;
    }

    public String getExternalDbName() {
        return id.getExternalDbName();
    }

    public void setExternalDbName(String externalDbName) {
        id.setExternalDbName(externalDbName);
    }

    public String getExternalId() {
        return id.getExternalId();
    }

    public void setExternalId(String externalId) {
        id.setExternalId(externalId);
    }
}
