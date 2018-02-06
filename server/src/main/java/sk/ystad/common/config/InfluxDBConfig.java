package sk.ystad.common.config;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Point;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.influxdb.DefaultInfluxDBTemplate;
import org.springframework.data.influxdb.InfluxDBConnectionFactory;
import org.springframework.data.influxdb.InfluxDBProperties;
import org.springframework.data.influxdb.InfluxDBTemplate;
import org.springframework.data.influxdb.converter.PointConverter;
import sk.ystad.repositories.measurements.PortfolioMeasurementRepository;

@Configuration
@EnableConfigurationProperties(InfluxDBProperties.class)
public class InfluxDBConfig
{
    @Value("${spring.influxdb.url}")
    private String influxUrl;
    @Value("${spring.influxdb.username}")
    private String influxUser;
    @Value("${spring.influxdb.password}")
    private String influxPassword;


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
        return InfluxDBFactory.connect(influxUrl, influxUser, influxPassword);
    }

    @Bean
    PortfolioMeasurementRepository portfolioMeasurementRepository(final InfluxDB influxDB) {
        return new PortfolioMeasurementRepository(influxDB);
    }
}