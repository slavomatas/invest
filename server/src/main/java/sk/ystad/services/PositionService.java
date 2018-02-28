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
import sk.ystad.model.measurements.ImmutableMeasure;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.securities.Security;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.securities.SecurityRepository;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.PositionRepository;
import sk.ystad.repositories.users.TradeRepository;
import sk.ystad.repositories.users.UserPositionRepository;

import java.security.Principal;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PositionService {

    private final TradeRepository tradeRepository;
    private final SecurityRepository securityRepository;
    private final UserPositionRepository userPositionRepository;
    private final PositionRepository positionRepository;
    private final PortfolioRepository portfolioRepository;
    private InfluxDB influxDB;

    @Autowired
    public PositionService(PositionRepository positionRepository, TradeRepository tradeRepository, SecurityRepository securityRepository, UserPositionRepository userPositionRepository, PortfolioRepository portfolioRepository, InfluxDB influxDB) {
        this.positionRepository = positionRepository;
        this.tradeRepository = tradeRepository;
        this.securityRepository = securityRepository;
        this.userPositionRepository = userPositionRepository;
        this.portfolioRepository = portfolioRepository;
        this.influxDB = influxDB;
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
    public ResponseEntity addTrade(long portfolioId, String symbol, String timestamp, Double price, int amount) {
        //Load user portfolio
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        UserPosition userPosition = positionRepository.findBySecuritySymbol(symbol);

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
            Security security = securityRepository.findBySymbol(symbol);
            userPosition = new UserPosition(security, null, portfolio);
            userPositionRepository.save(userPosition);
            logger.info("Created position: " + userPosition);
        }
        Trade trade = new Trade(userPosition, price, amount, formatedTimestamp);
        tradeRepository.save(trade);
        logger.info("Added trade to repository  " + trade);
        return new ResponseEntity<>(trade, HttpStatus.OK);
    }

    /**
     * Update trade in database
     * @param principal
     * @param trade
     * @return
     */
    public ResponseEntity updateTrade(Principal principal, Trade trade) {
        try {
            trade = tradeRepository.save(trade);
            logger.info("Updated trade: " + trade.toString());
            return new ResponseEntity(trade, HttpStatus.OK);
        }
        catch (NullPointerException e) {
            logger.error("Failed to update trade: " + e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    public ResponseEntity getAllPositions(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        List<UserPosition> positions = portfolio.getUsersPositions();

        LocalDate date20DaysAgo = LocalDate.now().minusDays(31);

        for (UserPosition position: positions) {
            try {
                String queryStr = String.format("SELECT * FROM %s WHERE time >= '%s' ORDER BY time ASC", position.getSecurity().getSymbol(), date20DaysAgo);
                Query query = new Query(queryStr, Measures.CLOSE_PRICE.getName());
                QueryResult queryResult = this.influxDB.query(query);

                List<List<Object>> values = queryResult.getResults().get(0).getSeries().get(0).getValues();
                List<TimeSeriesSimpleItem> last20Days = new ArrayList<>();
                for (List<Object> v: values) {
                    last20Days.add(new TimeSeriesSimpleItem((String) v.get(0), (Double) v.get(10)));
                }
                position.setPriceLast20Days(last20Days);
            }
            catch (NullPointerException e) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        }

        try {
            String queryStr = String.format("SELECT * FROM %s ORDER BY time DESC LIMIT 2", portfolio.getIdInflux());
            Query query = new Query(queryStr, Measures.PORTFOLIO_POSITIONS.getName());
            QueryResult queryResult = this.influxDB.query(query);
            List<List<Object>> values = queryResult.getResults().get(0).getSeries().get(0).getValues();
            List<String> columns = queryResult.getResults().get(0).getSeries().get(0).getColumns();
            for (int i = 1; i < values.get(0).size(); i++) {
                Position p = new Position(columns.get(i),0.0);
                for (UserPosition position: positions) {
                    if (position.getSecurity().getSymbol().equals(p.getSymbol())) {
                        position.setMarketValue((Double) values.get(0).get(i));
                        position.setLastChangeMarketValue((Double) values.get(0).get(i) - (Double) values.get(1).get(i));
                    }
                }
            }
        }
        catch (NullPointerException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(positions, HttpStatus.OK);
    }
}
