package sk.ystad.services;

import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.server.ServerStatus;

@RestController
@RequestMapping("/status")
public class ServerStatusService {

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "Get server status", notes = "Determines if the server is running or not")
    public ServerStatus getServerStatus() {
        return new ServerStatus();
    }

}
