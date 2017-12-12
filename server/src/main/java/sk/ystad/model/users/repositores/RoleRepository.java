package sk.ystad.model.users.repositores;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.users.database_objects.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByRoleName(String roleName);
}
