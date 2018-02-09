package sk.ystad.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import sk.ystad.common.data_structures.ServerStatus;

@Service
public class ServerStatusService {

    public ResponseEntity getServerStatus() {
        return new ResponseEntity<>(new ServerStatus(), HttpStatus.OK);
    }
}
