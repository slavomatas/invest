package sk.ystad.model.users.repositores;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import sk.ystad.model.users.database_objects.NewUser;

public interface NewUserRepository extends CrudRepository<NewUser, Long> {
    NewUser findByUsername(String username);
}