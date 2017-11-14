package sk.ystad.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.securities.database_objects.Security;
import sk.ystad.model.securities.repositories.SecurityRepository;

import java.util.List;


@RequestMapping("/v1")
@RestController
public class SecurityControllerService {

    private final SecurityRepository securityRepository;

    @Autowired
    public SecurityControllerService(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }

    @RequestMapping(value = "/{symbol}/securities", method = RequestMethod.GET)
    public List<Security> getSecurityBySymbol(@PathVariable String symbol){
        return securityRepository.findBySymbol(symbol);
    }


}

