package sk.ystad.services;

import javassist.NotFoundException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import sk.ystad.ServerApplication;
import sk.ystad.common.utils.FormatingUtil;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.securities.Security;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.securities.SecurityRepository;
import sk.ystad.repositories.users.*;

import java.security.Principal;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class PositionService {

    private final TradeRepository tradeRepository;
    private final SecurityRepository securityRepository;
    private final UserPositionRepository userPositionRepository;
    private final PositionRepository positionRepository;
    private final PortfolioRepository portfolioRepository;
    @Autowired
    private final UserRepository userRepository;
    private final RestCallingService restCallingService;
    private InfluxDB influxDB;

    @Autowired
    public PositionService(PositionRepository positionRepository, TradeRepository tradeRepository, SecurityRepository securityRepository, UserPositionRepository userPositionRepository, PortfolioRepository portfolioRepository, UserRepository userRepository, InfluxDB influxDB, RestCallingService restCallingService) {
        this.positionRepository = positionRepository;
        this.tradeRepository = tradeRepository;
        this.securityRepository = securityRepository;
        this.userPositionRepository = userPositionRepository;
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
        this.influxDB = influxDB;
        this.restCallingService = restCallingService;
    }

    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    /**
     * Return position by it's id
     *
     * @param positionId
     * @return
     */
    public ResponseEntity getPosition(long positionId) {
        return new ResponseEntity<>(positionRepository.findOne(positionId), HttpStatus.OK);
    }


    public ResponseEntity addPosition(long portfolioId, String symbol) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        Security security = securityRepository.findBySymbol(symbol);
        if (portfolio != null && security != null) {
            UserPosition position = new UserPosition(portfolio, security);
            positionRepository.save(position);
            logger.info("Created position: " + position);
            return new ResponseEntity<>(position, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * Adds trade to database, automatically adds position (if needed)
     *
     * @param portfolioId
     * @param symbol
     * @param timestamp
     * @param price
     * @param amount
     * @return
     */
    public ResponseEntity addTrade(long portfolioId,
                                   String symbol,
                                   String timestamp,
                                   double price,
                                   double amount) throws NotFoundException {

        //Check if security exists
        Security security = securityRepository.findBySymbol(symbol);
        if (security == null) {
            throw new NotFoundException("Security '" + symbol + "' not found.");
        }
        //Load user portfolio
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        UserPosition userPosition = positionRepository.findBySecuritySymbolAndPortfolio(symbol, portfolio);
        //Try to format date
        Date formatedTimestamp = null;

        try {
            formatedTimestamp = FormatingUtil.formatStringToDate(timestamp, "yyyy-MM-dd HH:mm:ss");
        } catch (ParseException e) {
            logger.error("Failed to format timestamp: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        //Position doesn't exist, create it
        if (userPosition == null) {
            userPosition = new UserPosition(security, null, portfolio);
            userPositionRepository.save(userPosition);

            logger.info("Created position: " + userPosition);
        }
        Trade trade = new Trade(userPosition, price, amount, formatedTimestamp);
        tradeRepository.save(trade);
        callCalculation(portfolio);
        logger.info("Added trade to repository  " + trade);
        return new ResponseEntity<>(trade, HttpStatus.OK);
    }

    private void callCalculation(Portfolio portfolio) {
        restCallingService.callRecalculation(portfolio);
    }

    /**
     * Update trade in database
     *
     * @param principal
     * @param trade
     * @return
     */
    public ResponseEntity updateTrade(Principal principal, Trade trade) {
        try {
            trade.setPosition(tradeRepository.findOne(trade.getTradeId()).getPosition());
            trade = tradeRepository.save(trade);
            callCalculation(trade);
            logger.info("Updated trade: " + trade.toString());
            return new ResponseEntity<>(trade, HttpStatus.OK);
        } catch (NullPointerException e) {
            logger.error("Failed to update trade: " + e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void callCalculation(Trade trade) {
        try {
            callCalculation(trade.getPosition().getPortfolio());
        } catch (NullPointerException ignored) {
        }
    }

    public ResponseEntity getAllPositions(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        List<UserPosition> positions = portfolio.getUsersPositions();

        logger.info("Loading positions for portfolio: " + portfolio.toString());
        logger.info("Loaded positions: " + positions.size());
        for (UserPosition position : positions) {
            try {
                String queryStr = String.format("SELECT * FROM %s ORDER BY time DESC LIMIT 20", position.getSecurity().getSymbol());
                Query query = new Query(queryStr, Measures.CLOSE_PRICE.getName());
                QueryResult queryResult = this.influxDB.query(query);

                List<List<Object>> values = queryResult.getResults().get(0).getSeries().get(0).getValues();
                Collections.reverse(values);
                List<TimeSeriesSimpleItem> last20Days = new ArrayList<>();
                for (List<Object> v : values) {
                    last20Days.add(new TimeSeriesSimpleItem((String) v.get(0), (Double) v.get(10)));
                }
                position.setPriceLast20Days(last20Days);
            } catch (NullPointerException e) {
                logger.error("Failed to load positions: ", e);
                return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        if (portfolio.getIdInflux() != null) {
            try {
                String queryStr = String.format("SELECT * FROM %s ORDER BY time DESC LIMIT 2", portfolio.getIdInflux());
                Query query = new Query(queryStr, Measures.PORTFOLIO_POSITIONS.getName());
                QueryResult queryResult = this.influxDB.query(query);
                List<List<Object>> values = queryResult.getResults().get(0).getSeries().get(0).getValues();
                List<String> columns = queryResult.getResults().get(0).getSeries().get(0).getColumns();
                for (int i = 1; i < values.get(0).size(); i++) {
                    Position p = new Position(columns.get(i), 0.0);
                    for (UserPosition position : positions) {
                        if (position.getSecurity().getSymbol().equals(p.getSymbol())) {
                            position.setMarketValue((Double) values.get(0).get(i));
                            position.setLastChangeMarketValue((Double) values.get(0).get(i) - (Double) values.get(1).get(i));
                        }
                    }
                }
            } catch (NullPointerException e) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        }

        return new ResponseEntity<>(positions, HttpStatus.OK);
    }
}
