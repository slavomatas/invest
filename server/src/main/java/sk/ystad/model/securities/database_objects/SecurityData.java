package sk.ystad.model.securities.database_objects;

import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
public interface SecurityData extends Serializable {
    Security getSecurity();
}
