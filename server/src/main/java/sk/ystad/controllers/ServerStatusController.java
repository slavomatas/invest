package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.services.ServerStatusService;

@RestController
@RequestMapping("/status")
public class ServerStatusController {

    //private static final Logger logger = Logger.getLogger(ServerStatusController.class);

    private final
    ServerStatusService serverStatusService;

    @Autowired
    public ServerStatusController(ServerStatusService serverStatusService) {
        this.serverStatusService = serverStatusService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "Get server status", notes = "Determines if the server is running or not")
    public ResponseEntity getServerStatus() {
        return serverStatusService.getServerStatus();
    }

}
