package sk.ystad.repositories.securities;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sk.ystad.model.securities.Security;

import java.sql.ResultSet;
import java.util.List;

@Repository
public interface SecurityRepository extends CrudRepository<Security, Long> {

    public Security findBySymbol(String symbol);

    @Query(value = "SELECT * FROM security " +
            "WHERE upper(name) LIKE upper(:text) " +
            "OR upper(symbol) LIKE upper(:text)  " +
            "LIMIT :limit", nativeQuery = true)
    public List<Security> fullTextSearchNameOrSymbol(@Param("text") String text, @Param("limit") Integer limit);

}
