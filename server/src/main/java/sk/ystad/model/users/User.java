package sk.ystad.model.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.validator.constraints.NotEmpty;
import sk.ystad.model.auth.Role;
import sk.ystad.model.users.portfolios.Portfolio;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    @NotEmpty(message = "Attribute username cannot be empty")
    private String username;

    @Column(name = "password")
    @NotEmpty(message = "Attribute password cannot be empty")
    @JsonIgnore
    private String password;

    @Column(name = "name")
    @NotEmpty(message = "Attribute name cannot be empty")
    private String name;

    @Column(name = "email")
    @NotEmpty(message = "Attribute email cannot be empty")
    private String email;

    @Column(name = "surname")
    @NotEmpty(message = "Attribute surname cannot be empty")
    private String surname;

    @Column(name = "token")
    private String registrationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationTimestamp;

    @Column(name = "registrationConfirmed")
    private boolean registrationConfirmed;

    @Column(name = "firstLogin")
    @ColumnDefault("false")
    private boolean firstLogin;

    /**
     * Roles are being eagerly loaded here because
     * they are a fairly small collection of items for this example.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns
            = @JoinColumn(name = "user_id",
            referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id",
                    referencedColumnName = "id"))
    private List<Role> roles;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "user")
    private List<Portfolio> portfolios;

    public User() {
        roles = new ArrayList<>();
    }

    public User(long id) {
        this.id = id;
    }

    public User(String username, String password, String name, String surname, String email) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.registrationConfirmed = false;
        generateNewToken();
        this.roles = new ArrayList<>();
    }

    public User(String username, String password, String name, String email, String surname, String registrationToken, Date registrationTimestamp, boolean registrationConfirmed, boolean firstLogin, List<Role> roles, List<Portfolio> portfolios) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.surname = surname;
        this.registrationToken = registrationToken;
        this.registrationTimestamp = registrationTimestamp;
        this.registrationConfirmed = registrationConfirmed;
        this.firstLogin = firstLogin;
        this.roles = roles;
        this.portfolios = portfolios;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Portfolio> getPortfolios() {
        return portfolios;
    }

    public void setPortfolios(List<Portfolio> portfolios) {
        this.portfolios = portfolios;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getRegistrationToken() {
        return registrationToken;
    }

    public void setRegistrationToken(String registrationToken) {
        this.registrationToken = registrationToken;
    }

    public Date getRegistrationTimestamp() {
        return registrationTimestamp;
    }

    public void setRegistrationTimestamp(Date registrationTimestamp) {
        this.registrationTimestamp = registrationTimestamp;
    }

    public void generateNewToken() {
        UUID uuid = UUID.randomUUID();
        this.registrationToken = uuid.toString();
    }

    public boolean isRegistrationConfirmed() {
        return registrationConfirmed;
    }

    public void setRegistrationConfirmed(boolean registrationConfirmed) {
        this.registrationConfirmed = registrationConfirmed;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    public boolean isFirstLogin() {
        return firstLogin;
    }

    public void setFirstLogin(boolean firstLogin) {
        this.firstLogin = firstLogin;
    }
}

