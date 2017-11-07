package sk.ystad.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.GET;
import sk.ystad.model.users.database_objects.Portfolio;
import sk.ystad.model.users.database_objects.User;
import sk.ystad.model.users.repositores.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserPortfoliosService {

    private final UserRepository userRepository;

    @Autowired
    UserPortfoliosService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/{userId}/findPortfolios")
    public String findByUserId(@PathVariable(value = "userId") Long userId) throws Exception {
        User user = userRepository.findOne(userId);

        JSONObject resultJsonObject = new JSONObject();
        resultJsonObject.put("userId", userId);

        JSONObject dataJsonObject = new JSONObject();

        JSONArray portfoliosJsonArray = new JSONArray();
        for (Portfolio portfolio: user.getPortfolios()) {
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
