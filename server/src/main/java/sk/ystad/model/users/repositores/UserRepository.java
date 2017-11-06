package sk.ystad.model.users.repositores;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.database_objects.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByUserId(String id);
}
