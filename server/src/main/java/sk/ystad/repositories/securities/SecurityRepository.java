package sk.ystad.repositories.securities;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sk.ystad.model.securities.Security;

import java.util.List;

@Repository
public interface SecurityRepository extends CrudRepository<Security, Long> {
    public Security findBySymbol(String symbol);
}
