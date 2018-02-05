package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.repositories.users.UserRepository;

import java.security.Principal;
import java.util.List;

@Service
public class PortfolioService {

    private final UserRepository userRepository;

    @Autowired
    public PortfolioService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Portfolio> getByUserId(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        return user.getPortfolios();
    }

}
