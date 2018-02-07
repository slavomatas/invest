package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.securities.Security;
import sk.ystad.repositories.securities.SecurityRepository;

import java.util.List;

@Service
public class SecurityService {

    final
    SecurityRepository securityRepository;

    @Autowired
    public SecurityService(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }

    public Security getSecurityBySymbol(String symbol) {
        return securityRepository.findBySymbol(symbol);
    }
}
