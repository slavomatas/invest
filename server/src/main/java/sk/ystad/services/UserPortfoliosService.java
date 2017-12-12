package sk.ystad.services;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.users.database_objects.Portfolio;
import sk.ystad.model.users.database_objects.User;
import sk.ystad.model.users.repositores.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class UserPortfoliosService {

    private final UserRepository userRepository;

    @Autowired
    UserPortfoliosService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/user/portfolios")
    @ApiOperation(value = "Get all user's portfolios details", notes = "UserID is retrieved from session")
    public List<Portfolio> findByUserId(){
        //TODO: get user assigned to current session
        long userId = 3L;
        User user = userRepository.findOne(userId);

        return user.getPortfolios();
    }

}
