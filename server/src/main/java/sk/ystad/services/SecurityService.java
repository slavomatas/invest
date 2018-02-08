package sk.ystad.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import sk.ystad.ServerApplication;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.securities.Security;
import sk.ystad.repositories.securities.SecurityRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    public Security getSecurityBySymbol(String symbol) {
        return securityRepository.findBySymbol(symbol);
    }

    /**
     * Get price of Security in given time
     * @param symbol
     * @param date
     * @return
     */
    public Position getSecurityPrice(String symbol, String date) {
        String queryStr = String.format("SELECT * FROM %s WHERE time='%s'", symbol, date);
        Query query = new Query(queryStr, Measures.CLOSE_PRICE.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();
        try {
            Double value = (Double) results.get(0).getSeries().get(0).getValues().get(0).get(10);
            return new Position(symbol, value);
        }
        catch (NullPointerException e) {
            logger.error("InfluxDB Parser Error: " + e);
        }

        return null;
    }
}
