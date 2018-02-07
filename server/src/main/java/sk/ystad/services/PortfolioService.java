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


    @Autowired
    public PortfolioService(UserRepository userRepository, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
    }

    public List<Portfolio> getByUserId(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        return user.getPortfolios();
    }

    public Portfolio createPortfolio(User user, Portfolio Portfolio) {
        Portfolio.setUser(user);
        portfolioRepository.save(Portfolio);
        user.getPortfolios().add(Portfolio);
        userRepository.save(user);
        return user.getPortfolios().get(user.getPortfolios().size() - 1);
    }
}
