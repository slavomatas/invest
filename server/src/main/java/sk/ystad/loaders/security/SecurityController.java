package sk.ystad.loaders.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.securities.database_objects.Etf;
import sk.ystad.model.securities.database_objects.Security;
import sk.ystad.model.securities.repositories.SecurityRepository;

import java.util.List;

@RestController
@RequestMapping("/loaders")
public class SecurityController {

    private final SecurityRepository securityRepository;

    @Autowired
    public SecurityController(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }

    @RequestMapping("/load_etfs")
    public List<Security> loadEtfsData() {
        List<Security> etfs = new SecurityLoader().loadEtfs();
        return etfs;
    }


    private void saveSecurities(List<Security> securities) {
        if (securities != null) {
            securityRepository.save(securities);
        }
    }
}
