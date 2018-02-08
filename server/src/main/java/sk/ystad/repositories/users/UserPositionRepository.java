package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sk.ystad.model.users.portfolios.positions.UserPosition;

@Repository
public interface UserPositionRepository  extends CrudRepository<UserPosition, Long>{
}
