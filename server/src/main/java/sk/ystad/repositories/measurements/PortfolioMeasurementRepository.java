package sk.ystad.repositories.measurements;

import org.apache.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.stereotype.Repository;
import sk.ystad.model.measurements.Measure;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;
import sk.ystad.model.users.portfolios.PortfolioSummary;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PortfolioMeasurementRepository {

    static Logger LOG = Logger.getLogger(PortfolioMeasurementRepository.class.getName());

    private InfluxDB influxDB;

    public PortfolioMeasurementRepository(final InfluxDB influxDB) {
        this.influxDB = influxDB;
    }

    public List<TimeSeriesSimpleItem> findMeasure(String portfolioId, Measure measure, LocalDate dateFrom, LocalDate dateTo) {

        List<TimeSeriesSimpleItem> portfolioCumulativeReturns = new ArrayList<>();
        String queryStr;
        if (dateFrom == null || dateTo == null) {
            queryStr = String.format("SELECT * FROM %s ORDER BY time ASC", portfolioId);
        } else {
            queryStr = String.format("SELECT * FROM %s WHERE time > '%s' AND time < '%s' ORDER BY time ASC", portfolioId, dateFrom, dateTo);
        }
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
                        portfolioCumulativeReturns.add(new TimeSeriesSimpleItem(rowValues.get(0).toString(),
                                (Double) rowValues.get(1)));
                    } catch (Exception e) {
                        LOG.info("Time: " + rowValues.get(0));
                        LOG.info("Value: " + rowValues.get(1));
                        LOG.error(e);
                    }
                }
            }
        }

        return portfolioCumulativeReturns;
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
            Double actualClosePrice = 0.0;
            Double actualMarketValue = 0.0;
            if (positionWithWeight.getSymbol().equals("cash")) {
                actualMarketValue = getPortfolioSummary(portfolioId).getCash();
            }
            else {
                actualClosePrice = getActualClosePriceForPosition(positionWithWeight.getSymbol());
                actualMarketValue = actualClosePrice * positionWithWeight.getValue();
            }

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
            if (resultSeries != null && results.size() > 0) {
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

    public PortfolioSummary getPortfolioSummary(String portfolioId) {
        String queryStr = String.format("SELECT * FROM %s GROUP BY *", portfolioId);
        Query query = new Query(queryStr, Measures.PORTFOLIO_SUMMARY.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();

        if (results != null && results.size() > 0) {
            List summaryValues = results.get(0).getSeries().get(0).getValues().get(0);
            return new PortfolioSummary((Double) summaryValues.get(1),
                                        (Double) summaryValues.get(2),
                                        (Double) summaryValues.get(3),
                                        (Double) summaryValues.get(4),
                                        (Double) summaryValues.get(5),
                                        (Double) summaryValues.get(6),
                                        (Double) summaryValues.get(7),
                                        (Double) summaryValues.get(8));

        }
        return null;
    }

}
