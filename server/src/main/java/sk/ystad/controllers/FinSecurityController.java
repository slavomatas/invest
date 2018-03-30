package sk.ystad.controllers;


import io.swagger.annotations.ApiOperation;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.securities.Security;
import sk.ystad.services.SecurityService;

import java.util.Date;
import java.util.List;


@RequestMapping("/v1")
@RestController
public class FinSecurityController {

    private final SecurityService securityService;

    @Autowired
    public FinSecurityController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @RequestMapping(value = "/{symbol}/securities", method = RequestMethod.GET)
    public ResponseEntity getSecurityBySymbol(@PathVariable String symbol){
        return securityService.getSecurityBySymbol(symbol);
    }

    @RequestMapping(value = "/security/{symbol}", method = RequestMethod.GET)
    public ResponseEntity getSecurityPrice(@PathVariable String symbol, @RequestParam String date) {
        return securityService.getSecurityPrice(symbol, date);
    }

    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Get securities using fulltext search", notes = "")
    @RequestMapping(value = "/security/search/{text}", method = RequestMethod.GET)
    public ResponseEntity test(@NotEmpty @PathVariable String text, @RequestParam Integer limit) {
        return new ResponseEntity<>(securityService.findSecurityFulltext(text, limit), HttpStatus.OK);
    }

}

