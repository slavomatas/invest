package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long>{
    User findByUsername(String username);
    User findByEmail(String email);
    User findByRegistrationToken(String registrationToken);
    List<User> findByRegistrationConfirmedFalse();

}
