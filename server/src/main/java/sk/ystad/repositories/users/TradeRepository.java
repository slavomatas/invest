package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.Trade;

public interface TradeRepository extends CrudRepository<Trade, Long> {
}
