package sk.ystad;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import sk.ystad.model.securities.database_objects.*;
import sk.ystad.model.securities.repositories.SecurityRepository;

import java.util.Date;

@SpringBootApplication
public class ServerApplication extends SpringBootServletInitializer {
	@PersistenceContext
	private EntityManager em;

	private static final Logger log = LoggerFactory.getLogger(ServerApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(ServerApplication.class);
	}

//	@Bean
//	public CommandLineRunner demo(SecurityRepository securityRepository) {
//		return (args) ->{
//			securityRepository.save(new Option("S2", "SecondSecurity", 2., new Date(), ExcerciseStyle.AMERICAN,
//					PayoffProfile.CALL,	null).getSecurity());
//			securityRepository.save(new EquityOptionSecurity("S3", "ThirdSecurity", 2., new Date(), ExcerciseStyle.AMERICAN,
//					PayoffProfile.CALL,	null).getSecurity());
//			securityRepository.save(new EquityBarierOptionSecurity("S4", "FourthSecurity", 2., new Date(), ExcerciseStyle.AMERICAN,
//					PayoffProfile.CALL,	null, 1., "BT", "BD", "MT", "SF").getSecurity());
//
//			log.info("Stored Securities:");
//			for (Security security : securityRepository.findAll()) {
//				log.info("{}:{} [{}]", security.getSymbol(), security.getName(), security.getSecurityData().getClass());
//			}
//		};
//	}
}
