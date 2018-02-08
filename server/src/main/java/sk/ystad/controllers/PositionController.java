package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
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
    public UserPosition getPosition(@PathVariable(value = "positionId") long positionId, Principal principal) {
        return positionService.getPosition(positionId);
    }

}
