package sk.ystad.common.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import sk.ystad.common.data_structures.WebSocketNotification;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.UserRepository;

@Service
public class WebSocketService {

    private final SimpMessagingTemplate template;
    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;

    private static final Logger logger = LogManager
            .getLogger(WebSocketService.class);

    @Autowired
    public WebSocketService(UserRepository userRepository, PortfolioRepository portfolioRepository, SimpMessagingTemplate template) {
        this.template = template;
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
    }

    public void sendPortfolioUpdateNotification(String username, Long portfolioId) {
        WebSocketNotification webSocketNotification = new WebSocketNotification("update_portfolio", portfolioId);
        template.convertAndSendToUser(username, "/queue/messages", webSocketNotification);
    }
}
