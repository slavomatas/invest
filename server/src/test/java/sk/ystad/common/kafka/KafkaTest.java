package sk.ystad.common.kafka;

import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.rule.KafkaEmbedded;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
public class KafkaTest {

    private static String BOOT_TOPIC = "boot.t";

    @Autowired
    private Sender sender;

    @Autowired
    private Receiver receiver;

    @ClassRule
    public static KafkaEmbedded embeddedKafka = new KafkaEmbedded(1, true, BOOT_TOPIC);

    @Test
    public void testReceive() throws Exception {
        sender.send(BOOT_TOPIC, "Hello Boot!");

        receiver.getLatch().await(10000, TimeUnit.MILLISECONDS);
        //assert(receiver.getLatch().getCount()).isEqualTo(0);

        assertEquals(0,receiver.getLatch().getCount());
    }
}


