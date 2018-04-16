package sk.ystad.services;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import sk.ystad.model.simple_data.SimplePortfolio;
import sk.ystad.model.users.portfolios.Portfolio;

@Service
public class RestCallingService {

    /**
     * Sends request to remote calculation API, returns new influx id
     * @param portfolio
     * @return
     */
    public String callRecalculation(Portfolio portfolio) {

        JSONObject object = null;

        try {
            //TODO presunut do konfiguraku
            final String uri = "https://portfoliohedger.online:5000/portfolioservice/backtest-influx";

            RestTemplate restTemplate = new RestTemplate();
            SimplePortfolio simplePortfolio = new SimplePortfolio(portfolio);
            String value = simplePortfolio.toJson();
            HttpEntity<String> request = new HttpEntity<String>(value);
            Object restCallResult = restTemplate.postForEntity(uri, request, String.class);
            object = new JSONObject(((ResponseEntity) restCallResult).getBody().toString());

            return object.getString("backtest_id");

        } catch (Exception e) {
            //TODO zalogovat
            e.printStackTrace();
        }
        //TODO upratat
        return null;
    }

}
