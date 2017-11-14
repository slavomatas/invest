package sk.ystad.loaders.security;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sk.ystad.ServerApplication;
import sk.ystad.loaders.LoaderResult;
import sk.ystad.model.securities.database_objects.Etf;
import sk.ystad.model.securities.database_objects.Security;
import sk.ystad.model.securities.repositories.SecurityRepository;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class SecurityLoader {

    private static final Logger log = LoggerFactory.getLogger(ServerApplication.class);

    /**
     *  Loads ETFs from file "../data/US_ETF.csv"
     *
     * @param securityRepository - repository from controller, which allows saving into database
     * @return loader result object that has information about loading
     */
    public LoaderResult loadEtfs(SecurityRepository securityRepository) {
        // variables init
        List<Security> etfs = new ArrayList<>();
        String resultMessage = "Etfs Loader";
        CSVParser parser = null;
        int succesfullCount = 0;
        int failedCount = 0;
        File file = new File("../data/US_ETF.csv");

        try {
            // csv parsing
            Reader targetReader = new FileReader(file);
            parser = CSVParser.parse(targetReader, CSVFormat.EXCEL.withHeader("CsiNumber", "Symbol", "Name",
                    "Exchange", "IsActive", "StartDate", "EndDate", "Sector", "Industry", "ConversionFactor", "SwitchCfDate", "PreSwitchCf",
                    "LastVolume", "Type,", "Currency"));
            //foreach line creating etf from file and adding it into list
            // handles 2 exceptions: ParseException
            //                       NumberFormatException
            // so if error occurs during parsing line this line is excluded from list
            for (CSVRecord csvRecord : parser) {
                try {

                    Etf tmpEtf = new Etf.EtfBuilder().buildFromCsv(csvRecord);
                    etfs.add(tmpEtf.getSecurity());

                    succesfullCount++;
                } catch (ParseException e) {
                    failedCount++;
                    log.error("Unable to parse etf csv file - problem with date format, at line " + (succesfullCount + 1) + ", " + e.getMessage());
                } catch (NumberFormatException e) {
                    failedCount++;
                    log.error("Unable to parse etf csv file - problem with number format, at line " + (succesfullCount + 1) + ", " + e.getMessage());
                }
            }
        } catch (IOException e) {
            // if file wasn't found
            log.error("Unable to parse etf csv file - problem with file " + e.getMessage());
            resultMessage = "Unable to parse etf csv file - problem with file " + e.getMessage();
        }
        if (securityRepository != null) {
            securityRepository.save(etfs);
            log.info("ETF securities saved succesfully, number of inserted etfs " + etfs.size());
        } else {
            resultMessage = "Unable to save etf - security repository is null";
            log.error(resultMessage);
        }
        return new LoaderResult(resultMessage, succesfullCount, failedCount);
    }
}
