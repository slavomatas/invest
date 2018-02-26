package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.ystad.ServerApplication;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.User;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.users.UserRepository;
import sk.ystad.services.PortfolioService;
import sk.ystad.services.UserService;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class PortfolioController {

    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    private final PortfolioService portfolioService;
    private final UserService userService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService, UserService userService) {
        this.portfolioService = portfolioService;
        this.userService = userService;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Get all user's portfolios details", notes = "UserID is retrieved from session")
    public ResponseEntity findByUserId(Principal principal){
        return portfolioService.getByUserId(principal);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Update portfolio", notes = "UserID is retrieved from session")
    public ResponseEntity updatePortfolio(Principal principal, @RequestBody Portfolio portfolio){
        return portfolioService.updatePortfolio(principal, portfolio);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios", method = RequestMethod.POST, produces ="application/json")
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Create new portfolio", notes = "UserID is retrieved from session")
    public ResponseEntity createPortfolio(Principal principal, @RequestBody Portfolio portfolio) {
        return portfolioService.createPortfolio(principal, portfolio);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolio/{portfolioId}", method = RequestMethod.GET)
//    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Recalculate portfolio metrics", notes = "UserID is retrieved from session")
    public ResponseEntity recalculatePortfolio(@PathVariable(name = "portfolioId") Long portfolioId) {
        try {
            portfolioService.recalculatePortfolio(portfolioId);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e) {
           return  new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
