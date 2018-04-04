package sk.ystad.common.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.web_socket.UserWebSocketHolder;
import sk.ystad.model.web_socket.WebSocketSingleton;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.UserRepository;

@Service
public class WebSocketService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;

    private static final Logger logger = LogManager
            .getLogger(WebSocketService.class);

    @Autowired
    public WebSocketService(UserRepository userRepository, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
    }

    public void processMessage(String message, SimpMessageHeaderAccessor headerAccessor) {
        try {
            //if contais email that describes user
            String email = headerAccessor.getNativeHeader("email").get(0);
//            User user = userRepository.findByEmail(email);
            JSONObject incommingJson = new JSONObject(message);
            if ("subscribe_to".equals(incommingJson.getString("command"))) {
                JSONArray subscribeArray = incommingJson.getJSONArray("values");
                WebSocketSingleton.getInstance().addSubscriptions(email, subscribeArray,
                        headerAccessor.getSessionId(), headerAccessor.getMessageHeaders());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void calulationFinished(long portfolioId, SimpMessagingTemplate template) {
        Portfolio portfolio = portfolioRepository.findOne(portfolioId);
        try {
            UserWebSocketHolder holder = WebSocketSingleton.getInstance().getUserSockets(portfolio.getUser().getEmail());
            notifyUserThroughSocket(holder, template, portfolioId);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
    }

    private void notifyUserThroughSocket(UserWebSocketHolder holder, SimpMessagingTemplate template, long portfolioId) throws NullPointerException {
        holder.notifyUserAboutPortfolio(template, portfolioId);
    }
}
