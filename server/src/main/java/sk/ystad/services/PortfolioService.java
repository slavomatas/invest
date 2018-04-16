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

import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class PortfolioService {

    private InfluxDB influxDB;

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final PositionRepository positionRepository;
    private final TradeRepository tradeRepository;
    private final SecurityRepository securityRepository;
    private final UserPositionRepository userPositionRepository;
    private final UserService userService;

    private final RestCallingService restCallingService;

    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    @Autowired
    public PortfolioService(UserRepository userRepository,
                            InfluxDB influxDB,
                            PortfolioRepository portfolioRepository,
                            PositionRepository positionRepository,
                            SecurityRepository securityRepository,
                            TradeRepository tradeRepository,
                            UserPositionRepository userPositionRepository,
                            UserService userService, RestCallingService restCallingService) {
        this.influxDB = influxDB;
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
        this.positionRepository = positionRepository;
        this.securityRepository = securityRepository;
        this.tradeRepository = tradeRepository;
        this.userPositionRepository = userPositionRepository;
        this.userService = userService;
        this.restCallingService = restCallingService;
    }

    public List<Portfolio> getByUserId(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        List<Portfolio> portfolios = portfolioRepository.getPortfoliosByUserAndModelIsFalse(user);

        //Get influx data for each portfolio
        for (Portfolio p : portfolios) {
            getPortfolioDetails(p.getId());
            p.setPositions(getPositionsWithMarketValue(p.getId()));
        }
        return portfolios;
    }

    public Portfolio getPortfolioDetails(long portfolioId) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);

        // Return portfolio immediately if no influxId is set
        if (portfolio.getIdInflux() == null) {
            return portfolio;
        }

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
     * @param portfolioId Portfolio ID
     * @return List of positions with their market value
     */
    public List<Position> getPositionsWithMarketValue(long portfolioId) {

        Portfolio portfolio = portfolioRepository.findOne(portfolioId);

        //Check if portfolio influxId is set
        if (portfolio.getIdInflux() == null) {
            return new ArrayList<>();
        }

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
        } catch (NullPointerException e) {
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

        // If no portfolio influx id is set
        if (portfolioId == null) {
            return new ArrayList<>();
        }

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
    public ResponseEntity updatePortfolio(Principal principal, Portfolio portfolio) {
        User user = userRepository.findByUsername(principal.getName());
        if (user != null) {
            portfolio.setUser(user);
            try {
                portfolio.setIdInflux(portfolioRepository.findOne(portfolio.getId()).getIdInflux());
                Portfolio updatedPortfolio = portfolioRepository.save(portfolio);
                if (updatedPortfolio != null) {
                    return new ResponseEntity<>(updatedPortfolio, HttpStatus.OK);
                } else {
                    return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            catch (NullPointerException e) {
                logger.error("Could not update portfolio: " + e.getMessage());
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    public UserPosition addPosition(long portfolioId, String symbol) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        Security security = securityRepository.findBySymbol(symbol);
        if (portfolio != null && security != null) {
            UserPosition position = new UserPosition(portfolio, security);
            positionRepository.save(position);
            logger.info("Created position: " + position );
            return position;
        }
        return null;
    }

    /**
     * Adds trade to database, automatically adds position (if needed)
     * @param portfolioId
     * @param symbol
     * @param timestamp
     * @param price
     * @param amount
     * @return
     */
    public Trade addTrade(long portfolioId, String symbol, String timestamp, Double price, int amount) {
        //Load user portfolio
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        UserPosition userPosition = positionRepository.findBySecuritySymbol(symbol);

        //Try to format date
        Date formatedTimestamp = null;
        try {
            formatedTimestamp = FormatingUtil.formatStringToDate(timestamp, "yyyy-MM-dd HH:mm:ss");
        } catch (ParseException e) {
            logger.error("Failed to format timestamp: " + e);
        }

        //Position doesn't exist, create it
        if (userPosition == null) {
            Security security = securityRepository.findBySymbol(symbol);
            userPosition = new UserPosition(security, null, portfolio);
            userPositionRepository.save(userPosition);
            logger.info("Created position: " + userPosition);
        }
        Trade trade = new Trade(userPosition, price, amount, formatedTimestamp);
        tradeRepository.save(trade);
        logger.info("Added trade to repository  " + trade);
        return trade;
    }

    /**
     *
     * @param principal
     * @param portfolio
     * @return
     */
    public ResponseEntity createPortfolio(Principal principal, Portfolio portfolio) {
        User user = (User) userService.getByUsername(principal).getBody();
        if (user != null) {
            portfolio.setUser(user);
            Portfolio resultPortfolio = portfolioRepository.save(portfolio);
            if(resultPortfolio != null){
                return new ResponseEntity<>(resultPortfolio, HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    /**
     * Get all model portfolios for user
     * @return list of model portfolios
     */
    public List<Portfolio> getModelPortfolios(Principal principal) {
        // Get all user model portfolios
        List<Portfolio> modelPortfolios = portfolioRepository.getPortfoliosByModelAndUser(true, userRepository.findByUsername(principal.getName()));
        // Get all default portfolios (admin's user - "test@test.com")
        String admin_username = "test@test.com".equals(principal.getName())? null : "test@test.com";
        modelPortfolios.addAll(portfolioRepository.getPortfoliosByModelAndUser(true, userRepository.findByUsername(admin_username)));
        return modelPortfolios;
    }

    /**
     * Get all user's and model portfolios
     * @param principal
     * @return list of user's and model portfolios
     */
    public List<Portfolio> getUserAndModelPortfolios(Principal principal) {
        List<Portfolio> portfolios = getByUserId(principal);
        portfolios.addAll(getModelPortfolios(principal));
        return portfolios;
    }

    public void recalculatePortfolio(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        String newIdInflux = callCalculation(portfolio);
        updateNewIdInflux(portfolio, newIdInflux);
    }

    private String callCalculation(Portfolio portfolio) {
        return restCallingService.callRecalculation(portfolio);
    }

    public Portfolio getByInfluxId(String influxId) {
        return portfolioRepository.getByIdInflux(influxId);
    }

    /**
     * Updates newIdInflux parameter
     * @param portfolio
     * @param newIdInflux
     */
    public void updateNewIdInflux(Portfolio portfolio, String newIdInflux) {
        portfolio.setNewIdInflux(newIdInflux);
        portfolioRepository.save(portfolio);
    }
}
