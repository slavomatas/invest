package sk.ystad.loaders.security;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sk.ystad.ServerApplication;
import sk.ystad.model.securities.database_objects.Etf;
import sk.ystad.model.securities.database_objects.Security;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

public class SecurityLoader {

    private static final Logger log = LoggerFactory.getLogger(ServerApplication.class);

    public List<Security> loadEtfs() {
        File file = new File("../data/US_ETF.csv");
        List<Security> etfs = new ArrayList<>();
        try {
            Reader targetReader = new FileReader(file);
            CSVParser parser = CSVParser.parse(targetReader, CSVFormat.EXCEL.withHeader("CsiNumber", "Symbol", "Name",
                    "Exchange", "IsActive", "StartDate", "EndDate", "Sector", "Industry", "ConversionFactor", "SwitchCfDate", "PreSwitchCf",
                    "LastVolume", "Type,", "Currency"));
            int i = 0;
            for (CSVRecord csvRecord : parser) {
                Etf tmpEtf = new Etf.EtfBuilder().buildFromCsv(csvRecord);
                etfs.add(tmpEtf.getSecurity());
                log.info("etf line loaded " + i +": "+ tmpEtf);
                i++;
            }
        } catch (IOException e) {
            log.error("Unable to parse etf csv file " + e.getMessage());
        } catch (Exception e) {
            log.error("Unable to parse etf csv file " + e.getMessage());
        }
        return etfs;
    }
}
