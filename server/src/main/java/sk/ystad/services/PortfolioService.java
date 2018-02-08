package sk.ystad.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import sk.ystad.ServerApplication;
import sk.ystad.common.utils.FormatingUtil;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.securities.Security;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.Returns;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.securities.SecurityRepository;
import sk.ystad.repositories.users.*;

import javax.sound.sampled.Port;
import java.security.Principal;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class PortfolioService {

    private InfluxDB influxDB;
    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;

    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    @Autowired
    public PortfolioService(UserRepository userRepository, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
    }


    public List<Portfolio> getByUserId(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        List<Portfolio> portfolios = user.getPortfolios();

        //Get influx data for each portfolio
        for (Portfolio p : portfolios) {
            getPortfolioDetails(p);
            p.setPositions(getPositionsWithMarketValue(p));
        }
        return portfolios;
    }

    public Portfolio getPortfolioDetails(Portfolio portfolio) {
        String queryStr = String.format("SELECT * FROM %s GROUP BY *", portfolio.getIdInflux());
        Query query = new Query(queryStr, Measures.PORTFOLIO_SUMMARY.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();

        try {
            List<Object> summaryValues = results.get(0).getSeries().get(0).getValues().get(0);
            Returns returns = new Returns();
            returns.setMonthly((double) summaryValues.get(1));
            returns.setWeekly((double) summaryValues.get(2));
            returns.setYearly((double) summaryValues.get(3));
            returns.setAll((double) summaryValues.get(4));
            portfolio.setReturns(returns);
            portfolio.setCash((double) summaryValues.get(5));
            portfolio.setLastChangeAbs((double) summaryValues.get(6));
            portfolio.setLastChangePct((double) summaryValues.get(7));
            portfolio.setMarketValue((double) summaryValues.get(8));
        }
        catch (NullPointerException e) {
            logger.error("InfluxDB Parser Error: " + e);
        }


        return portfolio;
    }

    /**
     * Method returns positions of portfolio with their last market value. If portfolio does not have any positions, empty array is returned.
     *
     * @param portfolio Portfolio
     * @return List of positions with their market value
     */
    public List<Position> getPositionsWithMarketValue(Portfolio portfolio) {
        List<Position> positionsWithMarketValue = new ArrayList<>();
        String queryStr = String.format("SELECT * FROM %s GROUP BY *", portfolio.getIdInflux());
        Query query = new Query(queryStr, Measures.PORTFOLIO_POSITIONS.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();

        try {
            List<String> positionNames = results.get(0).getSeries().get(0).getColumns();
            List<List<Object>> marketValues = results.get(0).getSeries().get(0).getValues();
            List<Object> actualmarketValues = marketValues.get(marketValues.size() - 1);
            for (int i = 1; i < positionNames.size(); i++) {
                positionsWithMarketValue.add(new Position(positionNames.get(i),
                        (Double) actualmarketValues.get(i)));
            }
        }
        catch (NullPointerException e) {
            logger.error("InfluxDB Parser Error: " + e);
        }

        return positionsWithMarketValue;
    }

    /**
     * Method returns actual close price for position with given symbol. If position with symbol is not found, method returns 0.
     *
     * @param symbol Position symbol
     * @return Close price for given position.
     */
    public Double getActualClosePriceForPosition(String symbol) {
        String queryStr = String.format("SELECT * FROM %s GROUP BY *", symbol);
        Query query = new Query(queryStr, Measures.CLOSE_PRICE.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();
        try {
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> resultSeries = result.getSeries();
            QueryResult.Series series = resultSeries.get(0);
            List<List<Object>> values = series.getValues();
            List<Object> lastValue = values.get(values.size() - 1);
            return (Double) lastValue.get(1);
        }
        catch (NullPointerException e) {
            logger.error("InfluxDB Parser Error: " + e);
        }

        return 0.0;
    }

    /**
     * Method returns positions of portfolio with their last weight. If portfolio does not have any positions, empty array is returned.
     *
     * @param portfolioId
     * @return List of positions with weight
     */
    public List<Position> getActualPortfolioPositionsWeights(String portfolioId) {
        String queryStr = String.format("SELECT * FROM %s GROUP BY *", portfolioId);
        Query query = new Query(queryStr, Measures.POSITION_WEIGHTS.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<Position> positions = new ArrayList<>();
        List<QueryResult.Result> results = queryResult.getResults();
        try {
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> resultSeries = result.getSeries();
            QueryResult.Series series = resultSeries.get(0);
            List<String> columns = series.getColumns();
            List<List<Object>> values = series.getValues();
            List<Object> lastValue = values.get(values.size() - 1);
            for (int i = 1; i < columns.size(); i++) {
                Position position = new Position(columns.get(i), (Double) lastValue.get(i));
                positions.add(position);
            }
        }
        catch (NullPointerException e) {
           logger.error("InfluxDB Parser Error: " + e);
        }

        return positions;
    }

    /**
     * Update portfolio
     *
     * @param principal
     * @param portfolio
     * @return updated portfolio
     */
    public Portfolio updatePortfolio(Principal principal, Portfolio portfolio) {
        User user = userRepository.findByUsername(principal.getName());
        if (user != null) {
            portfolio.setUser(user);
            return portfolioRepository.save(portfolio);
        }
        return null;
    }

}
