package sk.ystad.model.securities.repositories;

import org.springframework.data.repository.CrudRepository;
import sk.ystad.model.securities.database_objects.Option;

public interface OptionRepository  extends CrudRepository<Option, Long>{
}
