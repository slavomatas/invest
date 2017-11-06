package sk.ystad.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import sk.ystad.model.measures.database_objects.ImmutableMeasure;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeries;
import sk.ystad.model.users.database_objects.Portfolio;
import sk.ystad.model.users.repositores.PortfolioRepository;
import sk.ystad.model.users.repositores.UserRepository;

import java.net.URI;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/{userId}/portfolios")
public class UserPortfoliosService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    UserPortfoliosService(UserRepository userRepository, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
    }

    @GetMapping("/{userId}/findPortfolios")
    public String findByUserId(@PathVariable(value = "id") String userId) throws Exception {

        Collection<Portfolio> portfolios = portfolioRepository.findByUserId(userId);

        JSONObject resultJsonObject = new JSONObject();
        resultJsonObject.put("userId", userId);

        JSONObject dataJsonObject = new JSONObject();

        JSONArray portfoliosJsonArray = new JSONArray();
        for (Portfolio portfolio: portfolios) {
            JSONObject portfolioJsonObject = new JSONObject();
            portfolioJsonObject.put("id", portfolio.getId());
            portfolioJsonObject.put("name", portfolio.getName());
            portfoliosJsonArray.put(portfolioJsonObject);
        }
        dataJsonObject.put("portfolios", portfoliosJsonArray);

        resultJsonObject.put("data", dataJsonObject);
        return resultJsonObject.toString();
    }

}
