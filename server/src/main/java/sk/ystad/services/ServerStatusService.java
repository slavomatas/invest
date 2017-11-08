package sk.ystad.services;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.server.ServerStatus;

@RestController
@RequestMapping("/status")
public class ServerStatusService {

    @RequestMapping(method = RequestMethod.GET)
    public ServerStatus getServerStatus() {
        return new ServerStatus();
    }

}
