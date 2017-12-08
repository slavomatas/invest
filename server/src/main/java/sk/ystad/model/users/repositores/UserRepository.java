package sk.ystad.model.users.repositores;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.database_objects.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long>{
    User findByUsername(String username);
    User findByEmail(String email);
    User findByRegistrationToken(String registrationToken);
    List<User> findByRegistrationConfirmedFalse();

}
