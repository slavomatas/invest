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

//    SELECT s.name, s.symbol, ts_rank_cd(to_tsvector(name), to_tsquery('S&P | 500 | ETF')) AS similarity  FROM security AS s WHERE
//    lower(symbol) LIKE lower('x%') OR ts_rank_cd(to_tsvector(name), to_tsquery('S&P | 500 | ETF')) > 0
//    ORDER BY similarity DESC LIMIT 3

    @Query(value = "SELECT s FROM Security AS s WHERE  LOWER(symbol) LIKE LOWER(:symbol) OR ts_rank_cd(to_tsvector(name), to_tsquery(:lastName)) > 0" +
            " ORDER BY similarity DESC", nativeQuery = true)
    public Object findByNameElasticlyOrSymbolStartingWith(@Param("lastName") String lastName,
                                                             @Param("symbol") String symbol);

}
