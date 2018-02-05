package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.ystad.common.data_structures.Response;
import sk.ystad.services.UserService;

@RestController
@RequestMapping("/auth")
public class RegistrationController {

    @Autowired
    UserService userService;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    @ApiOperation(value = "Register new user", notes = "Registers new user")
    public Response register(@RequestParam(value = "password") String password, @RequestParam(value = "surname") String surname,
                         @RequestParam(value = "name") String name, @RequestParam(value = "email") String email) {
        return userService.registerUser(email, password, name, surname, email);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/register/{token}")
    @ApiOperation(value = "Verify registration token", notes = "Verifies if the submitted token is valid")
    public Response verify(@PathVariable String token) {
        return userService.verifyRegistrationToken(token);
    }
}
