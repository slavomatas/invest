package sk.ystad.services;

import org.springframework.stereotype.Service;
import sk.ystad.common.data_structures.ServerStatus;

@Service
public class ServerStatusService {

    public ServerStatus getServerStatus() {
        return new ServerStatus();
    }
}
