package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.UserPosition;

public interface PositionRepository extends CrudRepository<UserPosition, Long> {
    public UserPosition findBySecuritySymbol(String symbol);
    UserPosition findOne(long id);

    UserPosition findBySecuritySymbolAndPortfolio(String symbol, Portfolio portfolio);
}
