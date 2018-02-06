package sk.ystad.controllers;

import io.sentry.Sentry;
import io.swagger.annotations.ApiOperation;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.common.data_structures.ServerStatus;
import sk.ystad.services.ServerStatusService;

@RestController
@RequestMapping("/status")
public class ServerStatusController {

    private static final Logger logger = Logger.getLogger(ServerStatusController.class);

    private final
    ServerStatusService serverStatusService;

    @Autowired
    public ServerStatusController(ServerStatusService serverStatusService) {
        this.serverStatusService = serverStatusService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "Get server status", notes = "Determines if the server is running or not")
    public ServerStatus getServerStatus() {
        Sentry.init("https://7ece5aae6fdd496fad129dc5793641f2:e29d71fc05e24971aa73f7f5ccd913e6@sentry.io/283250");
//        Sentry.capture("halo pliiiis");
//        Sentry.
        logger.error("Error was handled");
        logger.warn("Error was handled");
        logger.info("Error was handled");
        return serverStatusService.getServerStatus();
    }

}
