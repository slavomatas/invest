package sk.ystad;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Point;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.influxdb.DefaultInfluxDBTemplate;
import org.springframework.data.influxdb.InfluxDBConnectionFactory;
import org.springframework.data.influxdb.InfluxDBProperties;
import org.springframework.data.influxdb.InfluxDBTemplate;
import org.springframework.data.influxdb.converter.PointConverter;
import sk.ystad.common.properties.PropertiesLoader;
import sk.ystad.model.measures.repositores.PortfolioMeasurementRepository;

@Configuration
@EnableConfigurationProperties(InfluxDBProperties.class)
public class InfluxDBConfiguration
{
    @Bean
    public InfluxDBConnectionFactory connectionFactory(final InfluxDBProperties properties)
    {
        return new InfluxDBConnectionFactory(properties);
    }

    @Bean
    public InfluxDBTemplate<Point> influxDBTemplate(final InfluxDBConnectionFactory connectionFactory)
    {
    /*
     * You can use your own 'PointCollectionConverter' implementation, e.g. in case
     * you want to use your own custom measurement object.
     */
        return new InfluxDBTemplate<>(connectionFactory, new PointConverter());
    }

    @Bean
    public DefaultInfluxDBTemplate defaultTemplate(final InfluxDBConnectionFactory connectionFactory)
    {
    /*
     * If you are just dealing with Point objects from 'influxdb-java' you could
     * also use an instance of class DefaultInfluxDBTemplate.
     */
        return new DefaultInfluxDBTemplate(connectionFactory);
    }

    @Bean
    public InfluxDB influxDb() {
        PropertiesLoader propertiesLoader = PropertiesLoader.getInstance();
        return InfluxDBFactory.connect(propertiesLoader.getInfluxUrl(), propertiesLoader.getInfluxUser(), propertiesLoader.getInfluxPassword());
    }

    @Bean
    PortfolioMeasurementRepository portfolioMeasurementRepository(final InfluxDB influxDB) {
        return new PortfolioMeasurementRepository(influxDB);
    }
}