package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.kapacitor.KapacitorAlert;
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
    @RequestMapping(value ="/kapacitor/alert", method = RequestMethod.POST)
    @ApiOperation(value = "Process alert from Kapacitor", notes = "")
    public void processAlert(@RequestBody KapacitorAlert kapacitorAlert) {
        kapacitorService.processAlert(kapacitorAlert);
    }
}
