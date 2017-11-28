package sk.ystad.services;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.users.database_objects.User;
import sk.ystad.model.users.repositores.UserRepository;

import java.security.Principal;


@RestController
@RequestMapping("/v1")
public class ResourceController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value ="/user", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Get user", notes = "Returns user details based on submitted token")
    public User getUser(Principal principal){
        User user = userRepository.findByUsername(principal.getName());
        return user;
    }
}
