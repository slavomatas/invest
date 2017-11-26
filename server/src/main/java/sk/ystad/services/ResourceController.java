package sk.ystad.services;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.model.users.database_objects.User;

import java.security.Principal;

/**
 * Created by nydiarra on 06/05/17.
 */
@RestController
@RequestMapping("/springjwt")
public class ResourceController {
    @RequestMapping(value ="/cities", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    public String getUser(Principal principal){
        return "A";
    }

    @RequestMapping(value ="/users", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER')")
    public String getUsers(@AuthenticationPrincipal User customUser){
        return "B";
    }

    @RequestMapping("/test")
    public String test() {
        return "test";
    }
}
