package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.users.portfolios.positions.Trade;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.services.PositionService;

import java.security.Principal;

@RestController
@RequestMapping("/v1")
public class PositionController {

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
    //@PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Create postion", notes = "UserID is retrieved from session")
    public ResponseEntity addPosition(@PathVariable(value="portfolioId") long portfolioId, @RequestParam("symbol") String symbol,
                                    Principal principal){
        return positionService.addPosition(portfolioId, symbol);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/portfolios/{portfolioId}/position/{symbol}/trade", method = RequestMethod.POST)
  //  @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Create a trade")
    public ResponseEntity addTrade(@PathVariable(value="portfolioId") long portfolioId,
                          @PathVariable(value="symbol") String symbol,
                          @RequestParam("timestamp") String timestamp,
                          @RequestParam("price") Double price,
                          @RequestParam("amount") int amount,
                          Principal principal){
        return positionService.addTrade(portfolioId, symbol, timestamp, price, amount);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/user/trade", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Update a trade")
    public ResponseEntity updateTrade(@RequestBody Trade trade,
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
    
    @RequestMapping(value ="/user/portfolios/{portfolioId}/position/{symbol}/trade", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @RequestMapping(value ="/user/trade", method = RequestMethod.PUT)
    //@PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Update a trade")
    public ResponseEntity updateTrade(@RequestBody Trade trade,
                                   Principal principal){
        return positionService.updateTrade(principal, trade);
    }
}
