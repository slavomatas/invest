package sk.ystad.model.users.repositores;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.database_objects.Portfolio;

public interface PortfolioRepository extends CrudRepository<Portfolio, Long> {
}
