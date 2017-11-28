package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.ystad.common.data_structures.Response;
import sk.ystad.model.users.database_objects.User;
import sk.ystad.model.users.services.AppUserDetailsService;

@RestController
@RequestMapping("auth")
public class AuthorizationController {

    @Autowired
    AppUserDetailsService appUserDetailsService;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public Response register(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password,
                         @RequestParam(value = "name") String name, @RequestParam(value = "email") String email) {
        User user = new User(username, password, name, email);
        return appUserDetailsService.registerUser(user);
    }
}
