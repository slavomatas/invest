package sk.ystad.services;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.common.data_structures.WebSocketNotification;
import sk.ystad.common.services.WebSocketService;
import sk.ystad.model.kapacitor.KapacitorAlert;
import sk.ystad.model.users.portfolios.Portfolio;

@Service
public class KapacitorService {

    private static final Logger logger = LogManager
            .getLogger(KapacitorService.class);

    final
    WebSocketService webSocketService;

    final
    PortfolioService portfolioService;

    @Autowired
    public KapacitorService(WebSocketService webSocketService, PortfolioService portfolioService) {
        this.webSocketService = webSocketService;
        this.portfolioService = portfolioService;
    }

    /**
     * Process received alert from Kapacitor
     */
    public void processAlert(KapacitorAlert kapacitorAlert) {
        switch (kapacitorAlert.getDetails()) {
            default:
                sendPortfolioUpdateNotification(kapacitorAlert.getId());
                break;
        }
    }

    /**
     * Send websocket notification to user associated with portfolio
     * @param portfolioId InfluxDb id of portfolio
     */
    private void sendPortfolioUpdateNotification(String portfolioId) {
        Portfolio portfolio = portfolioService.getByInfluxId(portfolioId);
        webSocketService.sendPortfolioUpdateNotification(portfolio.getUser().getUsername(), portfolio.getId());
    }
}
