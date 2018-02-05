package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.common.data_structures.Response;
import sk.ystad.model.users.User;
import sk.ystad.repositories.users.UserRepository;

import java.security.Principal;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository, AppUserDetailsService appUserDetailsService) {
        this.userRepository = userRepository;
        this.appUserDetailsService = appUserDetailsService;
    }


    final
    AppUserDetailsService appUserDetailsService;

    public User getByUsername(Principal principal) {
        return userRepository.findByUsername(principal.getName());
    }

    public Response registerUser(String username, String password,
                                 String name, String surname,String email) {
        User user = new User(username, password, name, surname, email);
        return appUserDetailsService.registerUser(user);
    }

    public Response verifyRegistrationToken(String token) {
        return appUserDetailsService.checkUser(token);
    }
}
