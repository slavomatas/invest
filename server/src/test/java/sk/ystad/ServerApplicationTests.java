package sk.ystad;

import org.apache.log4j.Logger;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sk.ystad.common.properties.PropertiesLoader;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ServerApplicationTests {

    static Logger LOG = Logger.getLogger(ServerApplicationTests.class.getName());

	@Test
	public void contextLoads() {
	}

	@Test
    public void propertiesLoad() {
        PropertiesLoader loader = PropertiesLoader.getInstance();
        String influxUser = loader.getInfluxUser();
        String expectedUser = "invest";

        Assert.assertEquals(influxUser, expectedUser);
    }
}
