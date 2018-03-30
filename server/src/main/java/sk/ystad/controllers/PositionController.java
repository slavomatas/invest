package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sk.ystad.ServerApplication;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.services.PositionService;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.security.Principal;

@RestController
@RequestMapping("/v1")
public class PositionController {
    private static final Logger logger = LogManager
            .getLogger(ServerApplication.class);

    final
    PositionService positionService;

    @Autowired
    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @RequestMapping(value = "/user/positions/{positionId}",
            method = RequestMethod.GET)
    @ApiOperation(value = "Get position with details", notes = "Provides position object with all asociated trades")
    public ResponseEntity getPosition(@PathVariable(value = "positionId") long positionId, Principal principal) {
        return positionService.getPosition(positionId);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios/{portfolioId}", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Create postion", notes = "UserID is retrieved from session")
    public ResponseEntity addPosition(@PathVariable(value="portfolioId") long portfolioId, @RequestParam("symbol") String symbol,
                                    Principal principal){
        return positionService.addPosition(portfolioId, symbol);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios/{portfolioId}/position/{symbol}/trade", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Create a trade")
    public ResponseEntity addTrade(@PathVariable(value="portfolioId") long portfolioId,
                          @PathVariable(value="symbol") @NotEmpty String symbol,
                          @RequestParam("timestamp") @NotEmpty String timestamp,
                          @RequestParam("price") @Min(0) double price,
                          @RequestParam("amount") @NotEmpty double amount,
                          Principal principal){
        try {

            return positionService.addTrade(portfolioId, symbol, timestamp, price, amount);
        }
        catch (NotFoundException e) {
            logger.error("Security '" + symbol + "'not found. ", e);
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/trade", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Update a trade")
    public ResponseEntity updateTrade(@Valid @RequestBody Trade trade,
                                   Principal principal){
        return positionService.updateTrade(principal, trade);
    }
    
    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolio/{portfolioId}/positions", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Get list of positions for portfolio")
    public ResponseEntity getAllPositions(@PathVariable(value="portfolioId") Long portfolioId) {
        return positionService.getAllPositions(portfolioId);
    }
    
}
