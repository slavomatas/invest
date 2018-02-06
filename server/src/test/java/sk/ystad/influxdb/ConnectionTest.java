package sk.ystad.influxdb;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.BatchPoints;
import org.influxdb.dto.Point;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.influxdb.InfluxDBProperties;
import org.springframework.data.influxdb.InfluxDBTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class ConnectionTest {

   // static Logger LOG = Logger.getLogger(ConnectionTest.class.getName());

    @Autowired
    public InfluxDBTemplate<Point> influxDBTemplate;

    @Test
    public void springDataInfluxDbLibraryTest(){
        String dbName =  influxDBTemplate.getDatabase();
        influxDBTemplate.createDatabase();

        // Create some data...
        final Point p1 = Point.measurement("cpu")
                .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
                .tag("tenant", "default")
                .addField("idle", 90L)
                .addField("user", 9L)
                .addField("system", 1L)
                .build();
        final Point p2 = Point.measurement("disk")
                .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
                .tag("tenant", "default")
                .addField("used", 80L)
                .addField("free", 1L)
                .build();
        influxDBTemplate.write(p1, p2);

        // ... and query the latest data
        final Query q = new Query("SELECT * FROM cpu GROUP BY tenant", influxDBTemplate.getDatabase());
        QueryResult queryResult = influxDBTemplate.getConnection().query(q);
        //LOG.info(queryResult);
        influxDBTemplate.getConnection().deleteDatabase(dbName);

        assertEquals((Double) 1.0, queryResult.getResults().get(0).getSeries().get(0).getValues().get(0).get(2));
        assertEquals((Double) 9.0, queryResult.getResults().get(0).getSeries().get(0).getValues().get(0).get(3));
        assertEquals("[time, idle, system, user]" , queryResult.getResults().get(0).getSeries().get(0).getColumns().toString());
    }

    @Test
    public void nativeConnectionTest(){
        String dbName = "DEFAULT";

        // Connect to InfluxDB
        InfluxDB influxDB = InfluxDBFactory.connect("http://localhost:9086", "invest", "t4gepDLL5SBjxsyj");
        // Create a database

        influxDB.createDatabase(dbName);
        // Create a 'batch' of example 'points'a
        BatchPoints batchPoints = BatchPoints
                .database(dbName)
                .tag("async", "true")
                .retentionPolicy("autogen")
                .consistency(InfluxDB.ConsistencyLevel.ALL)
                .tag("BatchTag", "BatchTagValue") // tag each point in the batch
                .build();
        Point point1 = Point.measurement("cpu")
                .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
                .addField("idle", 90L)
                .addField("user", 9L)
                .addField("system", 1L)
                .tag("CpuTag", "CpuTagValue") // tag the individual point
                .build();
        Point point2 = Point.measurement("disk")
                .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
                .addField("used", 80L)
                .addField("free", 1L)
                .build();
        batchPoints.point(point1);
        batchPoints.point(point2);
        // Write them to InfluxDB
        influxDB.write(batchPoints);

        Query query = new Query("SELECT * FROM disk", dbName);
        QueryResult queryResult = influxDB.query(query);
        // iterate the results and print details
        for (QueryResult.Result result : queryResult.getResults()) {
            // print details of the entire result
            System.out.println(result.toString());
            // iterate the series within the result
            for (QueryResult.Series series : result.getSeries()) {
                System.out.println("series.getName() = " + series.getName());
                System.out.println("series.getColumns() = " + series.getColumns());
                System.out.println("series.getValues() = " + series.getValues());
                System.out.println("series.getTags() = " + series.getTags());
            }
        }
        // Delete the database
        influxDB.deleteDatabase(dbName);
    }

    @Test
    public void createDeleteDatabaseTest(){
        String dbName = "DEFAULT";
        InfluxDBProperties influxDBProperties = influxDBTemplate.getConnectionFactory().getProperties();
        influxDBProperties.setDatabase(dbName);
        influxDBTemplate.getConnectionFactory().setProperties(influxDBProperties);
        influxDBTemplate.createDatabase();

        //Database exists
        assertEquals(true, databaseExists(influxDBProperties, dbName));

        //Database deleted
        influxDBTemplate.getConnection().deleteDatabase(dbName);
        assertEquals(false, databaseExists(influxDBProperties, dbName));
    }

    private boolean databaseExists(InfluxDBProperties properties, String databaseName){
        InfluxDB influxDB = InfluxDBFactory.connect(properties.getUrl(), properties.getUsername(), properties.getPassword());
        Query query = new Query("SHOW DATABASES", "_internal");
        QueryResult queryResult = influxDB.query(query);

        Boolean databaseExists = false;
        for (QueryResult.Result result : queryResult.getResults()) {
            for (QueryResult.Series series : result.getSeries()) {
                if(series.getName().equals("databases")){
                    for (List<Object> values : series.getValues()) {
                        for(Object obj: values){
                            if(obj.toString().equals(databaseName)) {
                                databaseExists = true;
                            }
                        }
                    }
                }
            }
        }
        return databaseExists;
    }
}
