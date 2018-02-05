package sk.ystad.services;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.users.database_objects.Portfolio;
import sk.ystad.model.users.database_objects.User;
import sk.ystad.model.users.repositores.UserRepository;

import java.security.Principal;
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
    @RequestMapping(value ="/user/portfolios", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Get all user's portfolios details", notes = "UserID is retrieved from session")
    public List<Portfolio> findByUserId(Principal principal){

        User user = userRepository.findByUsername(principal.getName());
        return user.getPortfolios();
    }

}
