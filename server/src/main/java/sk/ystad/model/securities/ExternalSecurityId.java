package sk.ystad.model.securities;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ExternalSecurityId implements Serializable {
    private String externalDbName;
    private String externalId;

    protected ExternalSecurityId(){
    }

    public ExternalSecurityId(String externalDbName, String externalId)
    {
        this.externalDbName = externalDbName;
        this.externalId = externalId;
    }

    public String getExternalDbName() {
        return externalDbName;
    }

    public void setExternalDbName(String externalDbName) {
        this.externalDbName = externalDbName;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }
}
