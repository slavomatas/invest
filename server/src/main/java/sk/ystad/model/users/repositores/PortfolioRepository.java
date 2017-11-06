package sk.ystad.model.users.repositores;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.database_objects.Portfolio;

import java.util.Collection;

public interface PortfolioRepository extends CrudRepository<Portfolio, String> {
    Collection<Portfolio> findByUserId(String id);
}
