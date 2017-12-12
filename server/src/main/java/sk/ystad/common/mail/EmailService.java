package sk.ystad.common.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import sk.ystad.common.properties.PropertiesLoader;

/**
 * Service for sending emails from server
 */
@Service
public class EmailService {

    private JavaMailSender javaMailSender;

    @Value("${spring.mail.sender}")
    private String sender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    /**
     * Send email from configured sender
     * @param toEmail recipient email address
     * @param subject email subject
     * @param message email body
     */
    public void sendMail(String toEmail, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailMessage.setFrom(sender);
        javaMailSender.send(mailMessage);
    }
}
