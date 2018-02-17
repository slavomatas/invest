package sk.ystad.common.loaders.services;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.auth.Role;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.securities.SecurityRepository;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.repositories.users.PositionRepository;
import sk.ystad.repositories.users.RoleRepository;
import sk.ystad.repositories.users.UserRepository;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class LoaderService {


    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PortfolioRepository portfolioRepository;
    private final SecurityRepository securityRepository;
    private final PositionRepository positionRepository;

    private static final Logger logger = LogManager.getLogger(LoaderService.class);

    @Autowired
    public LoaderService(UserRepository userRepository, RoleRepository roleRepository, PortfolioRepository portfolioRepository, SecurityRepository securityRepository, PositionRepository positionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.portfolioRepository = portfolioRepository;
        this.securityRepository = securityRepository;
        this.positionRepository = positionRepository;
    }

    public void loadTestingData() {
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

    /**
     * Loads portfolios from ../data/Model Portfolios
     *
     * @return number of loaded portfolios
     */
    public int loadModelPortfolios() {
        File modelPortfiliosDir = new File("../data/Model Portfolios");
        int portfoliosLoaded = 0;
        if (modelPortfiliosDir.exists()) {
            portfoliosLoaded = processModelPortfolioFiles(modelPortfiliosDir);
        }
        return portfoliosLoaded;
    }

    /**
     * Recursivelly search for model portfolio files
     * if file is directory this method searches into it
     *
     * @param fileToProcess
     * @return number of succesfully added portfolio files
     */
    private int processModelPortfolioFiles(File fileToProcess) {
        if (fileToProcess.isDirectory()) {
            File[] innerFiles = fileToProcess.listFiles();
            int portfoliosLoaded = 0;
            if (innerFiles != null) {
                for (File file : innerFiles) {
                    portfoliosLoaded += processModelPortfolioFiles(file);
                }
                return portfoliosLoaded;
            }
            return 0;
        } else {
            return processModelPortfolioFile(fileToProcess);
        }
    }

    /**
     * processes portfolio file checks file naming
     *
     * @param fileToProcess should be file that ends with .csv and contains positions
     * @return 1 when portfolio is saved to database successfully, else returns 0
     */
    private int processModelPortfolioFile(File fileToProcess) {
        if (fileToProcess != null && fileToProcess.getName().endsWith(".csv")) {
            String[] splittedFileName = fileToProcess.getName().split("\\.");
            if (splittedFileName.length > 0) {
                String porfolioName = splittedFileName[0];
                Portfolio portfolio = new Portfolio();
                portfolio.setName(porfolioName);
                portfolio.setModel(true);
                portfolio.setUsersPositions(createUserPostionsFromCsv(fileToProcess, portfolio));
                return portfolioRepository.save(portfolio) == null ? 0 : 1;
            }
        }
        return 0;
    }

    /**
     * Creates positions and trades from csv file
     *
     * @param fileToProcess
     * @param portfolio
     * @return list of positions in portfolio
     */
    private List<UserPosition> createUserPostionsFromCsv(File fileToProcess, Portfolio portfolio) {
        List<UserPosition> positions = new ArrayList<>();
        CSVParser parser = null;
        try {
            // csv parsing
            Reader targetReader = new FileReader(fileToProcess);
            parser = CSVParser.parse(targetReader, CSVFormat.EXCEL.withHeader("Symbol", "Weight"));
            for (CSVRecord csvRecord : parser) {
                try {
                    UserPosition position = new UserPosition();
                    position.setSecurity(securityRepository.findBySymbol(csvRecord.get("Symbol")));
                    Trade trade = new Trade();
                    trade.setAmount(Integer.parseInt(csvRecord.get("Weight")));
                    trade.setPosition(position);
                    trade.setDateTime(new Date());
                    position.addTrade(trade);
                    position.setPortfolio(portfolio);
                    positions.add(position);
                } catch (NumberFormatException e) {
                    logger.warn("Error during position parsing " + e.getMessage());
                }
            }
        } catch (IOException e) {
            logger.error("Unable to parse model porfolio file csv file - problem with file " + e.getMessage());
        }
        return positions;
    }
}
