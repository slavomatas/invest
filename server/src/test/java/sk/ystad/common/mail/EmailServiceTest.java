package sk.ystad.common.mail;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailServiceTest {

    private EmailService emailService;

    @Before
    public void setUp() {
        emailService = mock(EmailService.class);
    }

    @Test
    public void sendMail() throws Exception {
        String subject = "Some subject";
        String body = "Some contents.";
        String recipient = "test@test.com";

        emailService.sendMail(recipient, subject, body);
        verify(emailService, times(1)).sendMail(recipient, subject, body);
    }
}