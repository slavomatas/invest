package sk.ystad.services;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sk.ystad.common.data_structures.Response;
import sk.ystad.model.users.database_objects.User;
import sk.ystad.model.users.services.AppUserDetailsService;

@RestController
@RequestMapping("/auth")
public class RegistrationService {

    @Autowired
    AppUserDetailsService appUserDetailsService;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    @ApiOperation(value = "Register new user", notes = "Registers new user")
    public Response register(@RequestParam(value = "password") String password, @RequestParam(value = "surname") String surname,
                         @RequestParam(value = "name") String name, @RequestParam(value = "email") String email) {

        User user = new User(email, password, name, surname, email);
        return appUserDetailsService.registerUser(user);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/register/{token}")
    @ApiOperation(value = "Verify registration token", notes = "Verifies if the submitted token is valid")
    public Response verify(@PathVariable String token) {
        return appUserDetailsService.checkUser(token);
    }
}
