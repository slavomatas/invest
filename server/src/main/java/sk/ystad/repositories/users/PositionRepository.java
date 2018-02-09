package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.portfolios.positions.UserPosition;

public interface PositionRepository extends CrudRepository<UserPosition, Long> {
    public UserPosition findBySecuritySymbol(String symbol);
    UserPosition findOne(long id);
}
