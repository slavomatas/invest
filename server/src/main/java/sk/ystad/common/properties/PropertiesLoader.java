package sk.ystad.common.properties;


import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Properties;

@Component
public class PropertiesLoader {
    private static PropertiesLoader propertiesLoader = new PropertiesLoader();
    private static final Logger LOG = Logger.getLogger(PropertiesLoader.class.getName());


    private String postgreDatasourceUrl;
    private String postgreUser;
    private String postgrePassword;
    private String influxUrl;
    private String influxUser;
    private String influxPassword;
    private String influxDatabase;

    private PropertiesLoader() {

        Properties prop;
        prop = new Properties();

        /*
         * Load properties into variables to be easily accessed later
         */
        try {
            prop.load(this.getClass().getClassLoader().getResourceAsStream("application.properties"));
            postgreDatasourceUrl = prop.getProperty("spring.datasource.url");
            postgreUser = prop.getProperty("spring.datasource.username");
            postgrePassword = prop.getProperty("spring.datasource.password");
            influxUrl = prop.getProperty("spring.influxdb.url");
            influxUser = prop.getProperty("spring.influxdb.username");
            influxPassword = prop.getProperty("spring.influxdb.password");
            influxDatabase = prop.getProperty("spring.influxdb.database");
        } catch (IOException e) {
            LOG.error("Cannot load properties file" + e);
        }
    }

    public static PropertiesLoader getInstance() {
        return propertiesLoader;
    }

    public String getPostgreDatasourceUrl() {
        return postgreDatasourceUrl;
    }

    public String getPostgreUser() {
        return postgreUser;
    }

    public String getPostgrePassword() {
        return postgrePassword;
    }

    public String getInfluxUrl() {
        return influxUrl;
    }

    public String getInfluxUser() {
        return influxUser;
    }

    public String getInfluxPassword() {
        return influxPassword;
    }

    public String getInfluxDatabase() {
        return influxDatabase;
    }
}
