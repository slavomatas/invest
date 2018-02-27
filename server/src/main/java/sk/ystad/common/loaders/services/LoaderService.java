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
import sk.ystad.repositories.users.*;

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
    private final TradeRepository tradeRepository;

    private static final Logger logger = LogManager.getLogger(LoaderService.class);

    @Autowired
    public LoaderService(UserRepository userRepository, RoleRepository roleRepository, PortfolioRepository portfolioRepository, SecurityRepository securityRepository, PositionRepository positionRepository, TradeRepository tradeRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.portfolioRepository = portfolioRepository;
        this.securityRepository = securityRepository;
        this.positionRepository = positionRepository;
        this.tradeRepository = tradeRepository;
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
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(0), 49.784, 20, new Date(1444176000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(1), 41.84, 20, new Date(1444003200000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(2), 75.436, 10, new Date(1444262400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(3), 18.079, 10, new Date(1443744000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(4), 52.26, 20, new Date(1443830400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(5), 15.1, 10, new Date(1444089600000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(6), 45.730000000000004, 10, new Date(1443916800000L)));

        portfolio = createPortfolio("Portfolio2", user, "PID5a6f4f4aaf69115d83a41e25");
        createPositions(portfolio, "PSCT", "SKYY", "SSG", "VGT", "XLK", "FDN", "IBB");
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(0), 63.32, 20, new Date(1443744000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(4), 47.47, 20, new Date(1443830400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(6), 288.26, 10, new Date(1443916800000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(3), 119.77, 20, new Date(1444003200000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(2), 25.01, 20, new Date(1444089600000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(1), 34.01, 10, new Date(1444176000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(5), 81.74, 10, new Date(1444262400000L)));

        portfolio = createPortfolio("Portfolio3", user, "PID5a6f4f4aaf69115d83a41e26");
        createPositions(portfolio, "IFGL", "JNK", "TLT", "VYM", "DEM", "DES", "DOL", "DON");
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(6), 43.17, 7, new Date(1443744000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(1), 36.5, 15, new Date(1443830400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(7), 89.34, 12, new Date(1443916800000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(3), 71.44, 20, new Date(1444003200000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(2), 135.21, 15, new Date(1444089600000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(4), 37.37, 7, new Date(1444176000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(1), 29.63, 10, new Date(1444262400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(5), 74.09, 12, new Date(1444348800000L)));

        portfolio = createPortfolio("Portfolio4", user, "PID5a6f4f4aaf69115d83a41e27");
        createPositions(portfolio, "JNK", "KBWD", "LQD", "PEY", "SDIV", "AGG");
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(5), 111.71000000000001, 15, new Date(1443744000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(0), 36.5, 10, new Date(1443830400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(2), 121.94, 15, new Date(1443916800000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(4), 20.95, 20, new Date(1444003200000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(3), 15.58, 20, new Date(1444089600000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(1), 21.67, 20, new Date(1444176000000L)));


        portfolio = createPortfolio("Portfolio5", user, "PID5a6f4f4aaf69115d83a41e28");
        createPositions(portfolio, "RFG", "RPG", "RZG", "DNL", "ELD", "EMCB");
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(2), 88.15, 10, new Date(1443744000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(3), 49.041000000000004, 20, new Date(1443830400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(1), 83.56, 20, new Date(1443916800000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(4), 38.01, 20, new Date(1444003200000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(0), 123.53, 10, new Date(1444089600000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(5), 70.96000000000001, 20, new Date(1444176000000L)));

        portfolio = createPortfolio("Portfolio6", user, "PID5a6f4f4aaf69115d83a41e29");
        createPositions(portfolio, "IDV", "KXI", "AGG", "XLU", "DBP");
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(3), 47.29, 20, new Date(1443744000000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(1), 98.659, 20, new Date(1443830400000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(2), 111.71000000000001, 20, new Date(1443916800000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(4), 38.79, 20, new Date(1444003200000L)));
        tradeRepository.save(new Trade(portfolio.getUsersPositions().get(0), 29.810000000000002, 20, new Date(1444089600000L)));

    }

    private Portfolio createPortfolio(String name, User user, String influxId) {
        Portfolio portfolio = new Portfolio();
        portfolio.setName(name);
        portfolio.setUser(user);
        portfolio.setIdInflux(influxId);
        return portfolioRepository.save(portfolio);
    }

    private void createPositions(Portfolio portfolio, String... symbols) {
        List userPositions = new ArrayList<UserPosition>();
        if (portfolio == null || symbols == null) {
            return;
        }
        for (String symbol : symbols) {
            UserPosition position = new UserPosition();
            position.setPortfolio(portfolio);
            position.setSecurity(securityRepository.findBySymbol(symbol));
            positionRepository.save(position);
            userPositions.add(position);
        }
        portfolio.setUsersPositions(userPositions);

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
