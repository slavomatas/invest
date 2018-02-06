package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.portfolios.Portfolio;

public interface PortfolioRepository extends CrudRepository<Portfolio, Long> {
}
