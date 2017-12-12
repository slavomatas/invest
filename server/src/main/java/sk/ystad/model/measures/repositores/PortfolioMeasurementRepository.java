package sk.ystad.model.measures.repositores;

import org.apache.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.stereotype.Repository;
import sk.ystad.model.measures.database_objects.Measure;
import sk.ystad.model.measures.database_objects.Measures;
import sk.ystad.model.measures.database_objects.positions.Position;
import sk.ystad.model.timeseries.database_objects.date.localdate.ImmutableLocalDateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeriesBuilder;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class PortfolioMeasurementRepository {

    static Logger LOG = Logger.getLogger(PortfolioMeasurementRepository.class.getName());

    private InfluxDB influxDB;
    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public PortfolioMeasurementRepository(final InfluxDB influxDB) {
        this.influxDB = influxDB;
    }

    public LocalDateDoubleTimeSeries findMeasure(String portfolioId, Measure measure, LocalDate dateFrom, LocalDate dateTo) {
        LocalDateDoubleTimeSeriesBuilder builder = ImmutableLocalDateDoubleTimeSeries.builder();

        String queryStr = String.format("SELECT * FROM %s GROUP BY *", portfolioId);
        Query query = new Query(queryStr, measure.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();
        if (results != null && results.size() > 0) {
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> resultSeries = result.getSeries();
            if (resultSeries != null && resultSeries.size() > 0) {
                QueryResult.Series series = resultSeries.get(0);
                List<List<Object>> values = series.getValues();
                for (List<Object> rowValues : values) {
                    try {
                        Date date = simpleDateFormat.parse((String) rowValues.get(0));
                        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                        Double value = (Double) rowValues.get(1);
                        builder.put(localDate, value);
                    } catch (ParseException e) {
                        LOG.error(e.getMessage());
                    }
                }
            }
        }

        LocalDateDoubleTimeSeries timeSeries = builder.build();
        if (dateFrom != null && dateTo != null) {
            LocalDateDoubleTimeSeries subTimeSeries = timeSeries.subSeries(dateFrom, dateTo);
            return subTimeSeries;
        }
        return timeSeries;
    }

    /**
     * Method returns positions of portfolio with their last market value. If portfolio does not have any positions, empty array is returned.
     * @param portfolioId
     * @return List of positions with their market value
     */
    public List<Position> getPositionsWithMarketValue(String portfolioId) {
        List<Position> positionsWithMarketValue = new ArrayList<>();
        List<Position> positionsWithWeights = getActualPortfolioPositionsWeights(portfolioId);

        for (Position positionWithWeight : positionsWithWeights) {
            Double actualClosePrice = getActualClosePriceForPosition(positionWithWeight.getSymbol());
            Double actualMarketValue = actualClosePrice * positionWithWeight.getValue();
            Position positionWithMarketValue = new Position(positionWithWeight.getSymbol(), actualMarketValue);
            positionsWithMarketValue.add(positionWithMarketValue);
        }

        return positionsWithMarketValue;
    }

    /**
     * Method returns actual close price for position with given symbol. If position with symbol is not found, method returns 0.
     * @param symbol Position symbol
     * @return Close price for given position.
     */
    public Double getActualClosePriceForPosition(String symbol) {
        String queryStr = String.format("SELECT * FROM %s GROUP BY *", symbol);
        Query query = new Query(queryStr, Measures.CLOSE_PRICE.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();
        if (results != null && results.size() > 0) {
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> resultSeries = result.getSeries();
            if (results != null && results.size() > 0) {
                QueryResult.Series series = resultSeries.get(0);
                List<List<Object>> values = series.getValues();
                List<Object> lastValue = values.get(values.size() - 1);
                return (Double)lastValue.get(1);
            }
        }

        return 0.0;
    }

    /**
     * Method returns positions of portfolio with their last weight. If portfolio does not have any positions, empty array is returned.
     * @param portfolioId
     * @return List of positions with weight
     */
    public List<Position> getActualPortfolioPositionsWeights(String portfolioId) {
        String queryStr = String.format("SELECT * FROM %s GROUP BY *", portfolioId);
        Query query = new Query(queryStr, Measures.POSITION_WEIGHTS.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<Position> positions = new ArrayList<>();
        List<QueryResult.Result> results = queryResult.getResults();
        if (results != null && results.size() > 0) {
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> resultSeries = result.getSeries();
            if (resultSeries != null && resultSeries.size() > 0) {
                QueryResult.Series series = resultSeries.get(0);
                List<String> columns = series.getColumns();
                List<List<Object>> values = series.getValues();
                List<Object> lastValue = values.get(values.size() - 1);
                for (int i = 1; i < columns.size(); i++) {
                    Position position = new Position(columns.get(i), (Double)lastValue.get(i));
                    positions.add(position);
                }
            }
        }

        return positions;
    }

}
