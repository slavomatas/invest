package sk.ystad.model.securities.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sk.ystad.model.securities.database_objects.Security;

@Repository
public interface SecurityRepository extends CrudRepository<Security, Long> {
}
