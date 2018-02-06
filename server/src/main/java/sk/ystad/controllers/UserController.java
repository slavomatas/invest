package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.ystad.common.data_structures.Response;
import sk.ystad.model.users.User;
import sk.ystad.services.UserService;

import java.security.Principal;


@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value ="v1/user", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Get user", notes = "Returns user details based on submitted token")
    public User getUser(Principal principal){
        return userService.getByUsername(principal);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("auth/register")
    @ApiOperation(value = "Register new user", notes = "Registers new user")
    public Response register(@RequestParam(value = "password") String password, @RequestParam(value = "surname") String surname,
                             @RequestParam(value = "name") String name, @RequestParam(value = "email") String email) {
        return userService.registerUser(email, password, name, surname, email);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("auth/register/{token}")
    @ApiOperation(value = "Verify registration token", notes = "Verifies if the submitted token is valid")
    public Response verify(@PathVariable String token) {
        return userService.verifyRegistrationToken(token);
    }
}
