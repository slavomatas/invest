package sk.ystad.common.loaders.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.auth.Role;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.RoleRepository;
import sk.ystad.repositories.users.UserRepository;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.Properties;

@Service
public class LoaderService {


    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public LoaderService(UserRepository userRepository, RoleRepository roleRepository, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.portfolioRepository = portfolioRepository;
    }

    public void loadData() {
        User user = new User();
        user.setEmail("test@test.com");
        user.setUsername("test@test.com");
        user.setPassword("$2a$10$dt8q0sp8IJdtz9HbIk7c6Oo1EBP.a3rA30TkikJIqWfsY6T63YYGO");
        user.setRegistrationConfirmed(true);
        user.setName("Jožko");
        user.setSurname("Mrkvička");
        user.setRegistrationTimestamp(new Date());
        user.addRole(roleRepository.findByRoleName(Role.STANDARD_USER_STRING));
        userRepository.save(user);
        Portfolio portfolio = new Portfolio();
        portfolio.setName("Portfolio1");
        portfolio.setUser(user);
        portfolio.setIdInflux("PID5a6f4f49af69115d83a41e24");
        portfolioRepository.save(portfolio);
        for (int i = 1; i < 6; i++) {
            portfolio = new Portfolio();
            portfolio.setName("Portfolio" + (i + 1));
            portfolio.setUser(user);
            portfolio.setIdInflux("PID5a6f4f4aaf69115d83a41e" + (i + 24));
            portfolioRepository.save(portfolio);
        }


    }


}
