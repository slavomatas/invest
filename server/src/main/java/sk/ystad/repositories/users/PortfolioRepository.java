package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;

import java.util.List;

public interface PortfolioRepository extends CrudRepository<Portfolio, Long> {
    List<Portfolio> getPortfoliosByUserAndModelIsFalse(User user);
    List<Portfolio> getPortfoliosByModelAndUser (boolean isModel, User user);
    Portfolio getByIdInflux(String influxId);
}
