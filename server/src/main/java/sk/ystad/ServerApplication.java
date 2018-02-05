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
import org.springframework.scheduling.annotation.EnableScheduling;
import sk.ystad.model.auth.Role;
import sk.ystad.repositories.users.RoleRepository;

@SpringBootApplication
@EnableScheduling
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

	@Bean
	public CommandLineRunner rolesLoader(RoleRepository roleRepository) {
		return (args) ->{
			Role standardUserRole = roleRepository.findByRoleName(Role.STANDARD_USER_STRING);
			if(standardUserRole == null){
				roleRepository.save(new Role(Role.STANDARD_USER_STRING, null));
			}
		};
	}

}
