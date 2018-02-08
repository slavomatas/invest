package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
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
    @RequestMapping(value ="/user/portfolios", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Update portfolio", notes = "UserID is retrieved from session")
    public Portfolio updatePortfolio(Principal principal, @RequestBody Portfolio portfolio){
        return portfolioService.updatePortfolio(principal, portfolio);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios/{portfolioId}", method = RequestMethod.POST)
//    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
//    @ApiOperation(value = "Create postion", notes = "UserID is retrieved from session")
    public UserPosition addPosition(@PathVariable(value="portfolioId") long portfolioId, @RequestParam("symbol") String symbol,
                                    Principal principal){
        return portfolioService.addPosition(portfolioId, symbol);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios/{portfolioId}/position/{symbol}/trade", method = RequestMethod.POST)
//    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
//    @ApiOperation(value = "Create trade")
    public Trade addTrade(@PathVariable(value="portfolioId") long portfolioId,
                          @PathVariable(value="symbol") String symbol,
                          @RequestParam("timestamp") String timestamp,
                          @RequestParam("price") Double price,
                          @RequestParam("amount") int amount,
                          Principal principal){
        return portfolioService.addTrade(portfolioId, symbol, timestamp, price, amount);
    }



}
