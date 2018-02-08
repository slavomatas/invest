package sk.ystad.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import retrofit2.http.HTTP;
import sk.ystad.ServerApplication;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.repositories.securities.SecurityRepository;
import java.util.List;

@Service
public class SecurityService {

    private final SecurityRepository securityRepository;
    private InfluxDB influxDB;
    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    @Autowired
    public SecurityService(SecurityRepository securityRepository, InfluxDB influxDB) {
        this.securityRepository = securityRepository;
        this.influxDB = influxDB;
    }

    public ResponseEntity getSecurityBySymbol(String symbol) {
        return new ResponseEntity<>(securityRepository.findBySymbol(symbol), HttpStatus.OK);
    }

    /**
     * Get price of Security in given time
     * @param symbol
     * @param date
     * @return
     */
    public ResponseEntity getSecurityPrice(String symbol, String date) {
        String queryStr = String.format("SELECT * FROM %s WHERE time='%s'", symbol, date);
        Query query = new Query(queryStr, Measures.CLOSE_PRICE.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();
        try {
            Double value = (Double) results.get(0).getSeries().get(0).getValues().get(0).get(10);
            return new ResponseEntity<>(new Position(symbol, value), HttpStatus.OK);
        }
        catch (NullPointerException e) {
            logger.error("InfluxDB Parser Error: " + e);
        }

        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}
