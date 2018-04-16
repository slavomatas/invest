package sk.ystad.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import sk.ystad.model.simple_data.SimplePortfolio;
import sk.ystad.model.users.portfolios.Portfolio;

@Service
public class RestCallingService {

    /**
     * sends resquest to recalculat portfolio
     * @param portfolio
     */
    public void callRecalculation(Portfolio portfolio) {
        try {
            // this url has to be changed
            final String uri = "https://portfoliohedger.online:5000/portfolioservice/backtest-influx";

            RestTemplate restTemplate = new RestTemplate();
            SimplePortfolio simplePortfolio = new SimplePortfolio(portfolio);
            String value = simplePortfolio.toJson();
            HttpEntity<String> request = new HttpEntity<String>(value);
            Object restCallResult = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);
//            String restCallResult = restTemplate.postForObject(uri, request, String.class);
            System.out.print(restCallResult);
        } catch (Exception ignored) {
            ignored.printStackTrace();
        }
    }

}
