package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.ystad.ServerApplication;
import sk.ystad.common.services.WebSocketService;
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
    private final WebSocketService webSocketService;
    private final SimpMessagingTemplate template;

    @Autowired
    public PortfolioController(PortfolioService portfolioService, WebSocketService webSocketService, SimpMessagingTemplate template) {
        this.portfolioService = portfolioService;
        this.webSocketService = webSocketService;
        this.template = template;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "List of portfolios",
            notes = "UserID is retrieved from session. " +
                    "for type parameter 'USER' - get all user's portfolios with details, " +
                    "for type parameter 'MODEL' - get all model portfolios, " +
                    "for type parameter 'ALL' - get all user's portfolios with details and all model portfolios")
    public ResponseEntity findByUserId(Principal principal,
                                       @RequestParam(value = "type", defaultValue = "USER") String type){
        switch(type) {
            case "MODEL":
                try {
                    return new ResponseEntity<>(portfolioService.getModelPortfolios(principal), HttpStatus.OK);
                }
                catch (Exception e) {
                    logger.error("Get Model Portfolios Error: " + e);
                    return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            case "ALL":
                try {
                    return new ResponseEntity<>(portfolioService.getUserAndModelPortfolios(principal), HttpStatus.OK);
                }
                catch (Exception e) {
                    logger.error("Get User and Model Portfolios Error: " + e);
                    return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            case "USER":
                try {
                    return new ResponseEntity<>(portfolioService.getByUserId(principal), HttpStatus.OK);
                }
                catch (Exception e) {
                    logger.error("Get User Portfolios Error: " + e);
                    return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
                }
        }
        return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
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

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="portfolio/{id}/calculation", method = RequestMethod.GET)
    public String calculationFinished(@PathVariable long id){
        webSocketService.calulationFinished(id, template);
        return "ok";
    }
}
