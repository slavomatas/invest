package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.User;
import sk.ystad.services.PortfolioService;
import sk.ystad.services.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class PortfolioController {

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
    public List<Portfolio> findByUserId(Principal principal){
        return portfolioService.getByUserId(principal);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios", method = RequestMethod.POST, produces ="application/json")
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Create new portfolio", notes = "UserID is retrieved from session")
    public Portfolio createPortfolio(Principal principal, @RequestBody Portfolio portfolio) {
        User user = userService.getByUsername(principal);
        return portfolioService.createPortfolio(user, portfolio);
    }

}
