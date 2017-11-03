package sk.ystad.model.securities.repositories;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.securities.database_objects.Security;

public interface SecurityRepository extends CrudRepository<Security, Long> {
}
