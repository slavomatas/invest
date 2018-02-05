package sk.ystad.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.securities.Security;
import sk.ystad.services.FinancialSecurityService;

import java.util.List;


@RequestMapping("/v1")
@RestController
public class FinancialSecurityController {

    final
    FinancialSecurityService financialSecurityService;

    @Autowired
    public FinancialSecurityController(FinancialSecurityService financialSecurityService) {
        this.financialSecurityService = financialSecurityService;
    }

    @RequestMapping(value = "/{symbol}/securities", method = RequestMethod.GET)
    public List<Security> getSecurityBySymbol(@PathVariable String symbol){
        return financialSecurityService.getSecurityBySymbol(symbol);
    }


}

