package sk.ystad.common.loaders.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.common.loaders.LoaderResult;
import sk.ystad.model.securities.Security;
import sk.ystad.repositories.securities.SecurityRepository;

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
    public LoaderResult loadEtfsData() {
        return new SecurityLoader().loadEtfs(securityRepository);
    }

    private void saveSecurities(List<Security> securities) {
        if (securities != null) {
            securityRepository.save(securities);
        }
    }
}
