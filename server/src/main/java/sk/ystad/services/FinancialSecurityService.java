package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.securities.Security;
import sk.ystad.repositories.securities.SecurityRepository;

import java.util.List;

@Service
public class FinancialSecurityService {

    final
    SecurityRepository securityRepository;

    @Autowired
    public FinancialSecurityService(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }

    public List<Security> getSecurityBySymbol(String symbol) {
        return securityRepository.findBySymbol(symbol);
    }
}
