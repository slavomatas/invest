package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.ystad.services.KapacitorService;

@RestController
@RequestMapping("/v1")
public class KapacitorController {

    private static final Logger logger = LogManager
    .getLogger(KapacitorController.class);

    private final KapacitorService kapacitorService;

    @Autowired
    public KapacitorController(KapacitorService kapacitorService) {
        this.kapacitorService = kapacitorService;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="/portfolio/change", method = RequestMethod.POST)
    //@PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Process alert from Kapacitor", notes = "")
    public ResponseEntity portfolioChanged(@RequestBody String string){
        logger.info(string);
        return new ResponseEntity("Alert recieved", HttpStatus.OK);
    }
}
