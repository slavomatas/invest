package sk.ystad.server_test.model.repositories;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.server_test.model.database_objects.DatabaseConnectionTestObject;

import java.util.List;

public interface DbConnectionTestRepository extends CrudRepository<DatabaseConnectionTestObject, Long> {

    List<DatabaseConnectionTestObject> findByName(String name);
    List<DatabaseConnectionTestObject> findBySurname(String surname);

}
