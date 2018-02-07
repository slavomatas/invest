package sk.ystad.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.securities.Security;
import sk.ystad.services.SecurityService;

import java.util.List;


@RequestMapping("/v1")
@RestController
public class FinSecurityController {

    final
    SecurityService securityService;

    @Autowired
    public FinSecurityController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @RequestMapping(value = "/{symbol}/securities", method = RequestMethod.GET)
    public Security getSecurityBySymbol(@PathVariable String symbol){
        return securityService.getSecurityBySymbol(symbol);
    }


}

