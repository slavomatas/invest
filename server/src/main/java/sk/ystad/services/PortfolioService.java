package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.UserRepository;

import java.security.Principal;
import java.util.List;

@Service
public class PortfolioService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserService userService;


    @Autowired
    public PortfolioService(UserRepository userRepository, PortfolioRepository portfolioRepository, UserService userService) {
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
        this.userService = userService;
    }

    public List<Portfolio> getByUserId(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        return user.getPortfolios();
    }

    public Portfolio createPortfolio(Principal principal, Portfolio portfolio) {
        User user = userService.getByUsername(principal);
        if (user != null) {
            portfolio.setUser(user);
            Portfolio portfolioaaads = portfolioRepository.save(portfolio);
            if(portfolioaaads != null){
                return portfolioaaads;
            }
//            user.getPortfolios().add(portfolioaaads);
//            userRepository.save(user);
        }
        return null;
    }
}
