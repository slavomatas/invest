package sk.ystad.services;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONException;
import org.springframework.stereotype.Service;
import sk.ystad.model.kapacitor.KapacitorAlert;

@Service
public class KapacitorService {

    private static final Logger logger = LogManager
            .getLogger(KapacitorService.class);

    /**
     * Process received alert from Kapacitor
     */
    public void processAlert(KapacitorAlert kapacitorAlert) {
        //TODO proccess alert
    }

}
