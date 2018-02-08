package sk.ystad.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.ServerApplication;
import sk.ystad.model.measurements.ImmutableMeasure;
import sk.ystad.model.measurements.Measure;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.repositories.users.PortfolioRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioMeasurementsService {

    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    private final InfluxDB influxDB;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public PortfolioMeasurementsService(InfluxDB influxDB, PortfolioRepository portfolioRepository) {
        this.influxDB = influxDB;
        this.portfolioRepository = portfolioRepository;
    }


    public List<TimeSeriesSimpleItem> getMeasurement(Long portfolioId, String measurementType, LocalDateTime dateFrom, LocalDateTime dateTo) {
        List<TimeSeriesSimpleItem> timeSeriesItems = new ArrayList<>();

        LocalDate localDateFrom = null;
        LocalDate localDateTo = null;
        if (dateFrom != null) {
            localDateFrom = dateFrom.toLocalDate();
        }
        if (dateTo != null) {
            localDateTo = dateTo.toLocalDate();
        }

        String influxId = this.portfolioRepository.findOne(portfolioId).getIdInflux();
        ImmutableMeasure immutableMeasure = ImmutableMeasure.of(measurementType);
        return findMeasure(influxId, immutableMeasure, localDateFrom, localDateTo);
    }

    public List<TimeSeriesSimpleItem> getMeasurementMarket(Long portfolioId, LocalDateTime dateFrom, LocalDateTime dateTo) {
        List<TimeSeriesSimpleItem> timeSeriesItems = new ArrayList<>();

        LocalDate localDateFrom = null;
        LocalDate localDateTo = null;
        if (dateFrom != null) {
            localDateFrom = dateFrom.toLocalDate();
        }
        if (dateTo != null) {
            localDateTo = dateTo.toLocalDate();
        }

        String influxId = this.portfolioRepository.findOne(portfolioId).getIdInflux();
        ImmutableMeasure immutableMeasure = ImmutableMeasure.of("PORTFOLIO_MARKET_VALUE");
        return findMeasure(influxId, immutableMeasure, localDateFrom, localDateTo);

    }


    public List<TimeSeriesSimpleItem> findMeasure(String portfolioId, Measure measure, LocalDate dateFrom, LocalDate dateTo) {

        List<TimeSeriesSimpleItem> portfolioCumulativeReturns = new ArrayList<>();
        String queryStr;
        if (dateFrom == null || dateTo == null) {
            queryStr = String.format("SELECT * FROM %s ORDER BY time ASC", portfolioId);
        } else {
            queryStr = String.format("SELECT * FROM %s WHERE time >= '%s' AND time < '%s' ORDER BY time ASC", portfolioId, dateFrom, dateTo);
        }
        Query query = new Query(queryStr, measure.getName());
        QueryResult queryResult = this.influxDB.query(query);
        try {
            List<QueryResult.Result> results = queryResult.getResults();
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> resultSeries = result.getSeries();
            QueryResult.Series series = resultSeries.get(0);
            List<List<Object>> values = series.getValues();
            for (List<Object> rowValues : values) {
                portfolioCumulativeReturns.add(new TimeSeriesSimpleItem(rowValues.get(0).toString(),
                        (Double) rowValues.get(1)));
            }
        }
        catch (NullPointerException e) {
            logger.error("InfluxDB Parser Error: " + e);
        }

        return portfolioCumulativeReturns;
    }



}
