package sk.ystad.common.loaders.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.auth.Role;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.securities.SecurityRepository;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.PositionRepository;
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
    private final SecurityRepository securityRepository;
    private final PositionRepository positionRepository;

    @Autowired
    public LoaderService(UserRepository userRepository, RoleRepository roleRepository, PortfolioRepository portfolioRepository, SecurityRepository securityRepository, PositionRepository positionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.portfolioRepository = portfolioRepository;
        this.securityRepository = securityRepository;
        this.positionRepository = positionRepository;
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

        Portfolio portfolio = createPortfolio("Portfolio1", user, "PID5a6f4f49af69115d83a41e24");
        createPositions(portfolio, "NFO", "PDP", "PSR", "CEW", "CSM", "DBC", "BIL");

        portfolio = createPortfolio("Portfolio2", user, "PID5a6f4f4aaf69115d83a41e25");
        createPositions(portfolio, "PSCT", "SKYY", "SSG", "VGT", "XLK", "FDN", "IBB");

        portfolio = createPortfolio("Portfolio3", user, "PID5a6f4f4aaf69115d83a41e26");
        createPositions(portfolio, "IFGL", "JNK", "TLT", "VYM", "DEM", "DES", "DOL", "DON");


        portfolio = createPortfolio("Portfolio4", user, "PID5a6f4f4aaf69115d83a41e27");
        createPositions(portfolio, "JNK", "KBWD", "LQD", "PEY", "SDIV", "AGG");

        portfolio = createPortfolio("Portfolio5", user, "PID5a6f4f4aaf69115d83a41e28");
        createPositions(portfolio, "RFG", "RPG", "RZG", "DNL", "ELD", "EMCB");

        portfolio = createPortfolio("Portfolio6", user, "PID5a6f4f4aaf69115d83a41e29");
        createPositions(portfolio, "IDV", "KXI", "AGG", "XLU", "DBP");

    }

    private Portfolio createPortfolio(String name, User user, String influxId) {
        Portfolio portfolio = new Portfolio();
        portfolio.setName(name);
        portfolio.setUser(user);
        portfolio.setIdInflux(influxId);
        return portfolioRepository.save(portfolio);
    }

    private void createPositions(Portfolio portfolio, String... symbols) {
        if (portfolio == null || symbols == null) {
            return;
        }
        for (String symbol : symbols) {
            UserPosition position = new UserPosition();
            position.setPortfolio(portfolio);
            position.setSecurity(securityRepository.findBySymbol(symbol));
            positionRepository.save(position);
        }

    }


}
