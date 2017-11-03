package sk.ystad.server_test.common.properties_loading;

import java.io.IOException;
import java.util.Properties;

public class PropertiesLoader {
    private Properties prop;

    public PropertiesLoader() {
        prop = new Properties();
        try {
            prop.load(this.getClass().getClassLoader().getResourceAsStream("application.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getProperty(String name) {
        return prop.getProperty(name);
    }
}
