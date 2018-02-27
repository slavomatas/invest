package sk.ystad.common.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import sk.ystad.ServerApplication;

import java.util.concurrent.CountDownLatch;

@Component
public class Receiver {

    private static final Logger logger = LogManager
            .getLogger(Receiver.class);
    private CountDownLatch latch = new CountDownLatch(1);

    public CountDownLatch getLatch() {
        return latch;
    }

    @KafkaListener(topics = "${spring.kafka.topic.boot}")
    public void receive(ConsumerRecord<?, ?> consumerRecord) {
        logger.info("received payload='{}'", consumerRecord.toString());
        latch.countDown();
    }
}
