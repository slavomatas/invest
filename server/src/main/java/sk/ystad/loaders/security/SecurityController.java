package sk.ystad.loaders.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import sk.ystad.model.securities.database_objects.Security;
import sk.ystad.model.securities.repositories.SecurityRepository;

import java.util.List;

@Controller
public class SecurityController {

    private final SecurityRepository securityRepository;

    @Autowired
    public SecurityController(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }

    public void saveSecurities(List<Security> securities){
        if(securities != null){
            securityRepository.save(securities);
        }
    }
}
