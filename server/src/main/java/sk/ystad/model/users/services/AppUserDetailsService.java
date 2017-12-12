package sk.ystad.model.users.services;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sk.ystad.common.data_structures.Response;
import sk.ystad.common.mail.EmailService;
import sk.ystad.model.users.database_objects.User;
import sk.ystad.model.users.repositores.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class AppUserDetailsService implements UserDetailsService {

    private static final long REGISTRATION_TIME_OUT = 1000 * 60 * 60 * 12;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    static Logger log = Logger.getLogger(AppUserDetailsService.class.getName());

    @Autowired
    public AppUserDetailsService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("The username %s doesn't exist", s));
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        });

        UserDetails userDetails = new org.springframework.security.core.userdetails.
                User(user.getUsername(), user.getPassword(), authorities);

        return userDetails;
    }

    public Response registerUser(User user) {
        if (emailExist(user.getEmail()) || usernameExist(user.getUsername())) {
            return new Response(false, "User already exists");
        }
        while (tokenExists(user.getRegistrationToken())) {
            user.generateNewToken();
        }
        user.setRegistrationTimestamp(new Date());
        hashPassword(user);
        userRepository.save(user);
        sendEmail(user);
        return new Response(true, null);
    }

    private void sendEmail(User user) {
        emailService.sendMail(user.getEmail(), "Registration confirmation", "Thank you for your " +
                "registration.\nPlease confirm your email by clicking on following link:\n" +
                "http://localhost:8085/tuBudeLink/" + user.getRegistrationToken());
    }

    private boolean tokenExists(String registrationToken) {
        User user = userRepository.findByRegistrationToken(registrationToken);
        if (user != null) {
            return true;
        }
        return false;

    }

    private void hashPassword(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
    }

    private boolean emailExist(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }

    private boolean usernameExist(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return true;
        }
        return false;
    }

    public Response checkUser(String token) {
        User user = userRepository.findByRegistrationToken(token);
        if (user == null) {
            return new Response(false, null);
        } else {
            if (user.isRegistrationConfirmed()) {
                return new Response(true, null);
            } else {
                if (registrationExpired(user.getRegistrationTimestamp())) {
                    userRepository.delete(user);
                    return new Response(false, null);
                } else {
                    user.setRegistrationConfirmed(true);
                    userRepository.save(user);
                    return new Response(true, null);
                }
            }
        }
    }

    private boolean registrationExpired(Date registrationTimestamp) {
        return (new Date().getTime() - registrationTimestamp.getTime()) > REGISTRATION_TIME_OUT;
    }

    /**
     * Method for removing users with expired registration token
     */
    @Scheduled(cron = "0 0 */6 * * *")
    public void removeUnActivatedUsers() {
        List<User> inactiveUsers = userRepository.findByRegistrationConfirmedFalse();
        //Check all users for expired tokens
        for (User user : inactiveUsers) {
            // If token is expired, delete the user
            if (registrationExpired(user.getRegistrationTimestamp())) {
                userRepository.delete(user);
                log.info("Deleted unactived user " + user.getUsername() + " : token expired");
            }
            ;
        }
    }
}
