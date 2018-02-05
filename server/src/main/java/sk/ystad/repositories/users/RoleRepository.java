package sk.ystad.repositories.users;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.auth.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByRoleName(String roleName);
}
