package sk.ystad.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.ServerApplication;
import sk.ystad.common.utils.FormatingUtil;
import sk.ystad.model.securities.Security;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.securities.SecurityRepository;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.PositionRepository;
import sk.ystad.repositories.users.TradeRepository;
import sk.ystad.repositories.users.UserPositionRepository;

import java.text.ParseException;
import java.util.Date;

@Service
public class PositionService {

    private final TradeRepository tradeRepository;
    private final SecurityRepository securityRepository;
    private final UserPositionRepository userPositionRepository;
    private final PositionRepository positionRepository;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public PositionService(PositionRepository positionRepository, TradeRepository tradeRepository, SecurityRepository securityRepository, UserPositionRepository userPositionRepository, PortfolioRepository portfolioRepository) {
        this.positionRepository = positionRepository;
        this.tradeRepository = tradeRepository;
        this.securityRepository = securityRepository;
        this.userPositionRepository = userPositionRepository;
        this.portfolioRepository = portfolioRepository;
    }

    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    /**
     * Return position by it's id
     * @param positionId
     * @return
     */
    public UserPosition getPosition(long positionId) {
        return positionRepository.findOne(positionId);
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
}
