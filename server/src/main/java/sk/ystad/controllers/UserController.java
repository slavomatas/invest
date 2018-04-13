package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity getUser(Principal principal){
        return userService.getByUsername(principal);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("auth/register")
    @ApiOperation(value = "Register new user", notes = "Registers new user")
    public ResponseEntity register(@RequestParam(value = "password") @NotEmpty String password, @RequestParam(value = "surname") @NotEmpty String surname,
                                   @RequestParam(value = "name") @NotEmpty String name, @NotEmpty @RequestParam(value = "email") String email) {
        return userService.registerUser(email, password, name, surname, email);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("auth/register/{token}")
    @ApiOperation(value = "Verify registration token", notes = "Verifies if the submitted token is valid")
    public ResponseEntity verify(@PathVariable String token) {
        return userService.verifyRegistrationToken(token);
    }


    @CrossOrigin(origins = "*")
    @PutMapping("v1/user/first_login")
    @PreAuthorize("hasAuthority('ADMIN_USER') or hasAuthority('STANDARD_USER')")
    @ApiOperation(value = "Update first login flag", notes = "")
    public ResponseEntity updateFirstLogin(Principal principal, @RequestParam(value = "firstLogin") boolean firstLogin) {
        userService.updateFirstLogin(principal, firstLogin);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
