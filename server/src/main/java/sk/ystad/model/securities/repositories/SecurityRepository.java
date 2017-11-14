package sk.ystad.model.securities.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sk.ystad.model.securities.database_objects.Security;

import java.util.List;

@Repository
public interface SecurityRepository extends CrudRepository<Security, Long> {
    public List<Security> findBySymbol(String symbol);
}
