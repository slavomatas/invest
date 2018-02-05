package sk.ystad.model.users.portfolios;
import com.fasterxml.jackson.annotation.JsonIgnore;
import sk.ystad.model.users.User;

import javax.persistence.*;

@Entity
public class Portfolio {

    private Long id;

    @Column(name = "name")
    private String name;


    @JsonIgnore
    private User user;

    @JsonIgnore
    @Column(name = "id_influx")
    private String idInflux;

    public  Portfolio(){

    }

    public Portfolio(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Portfolio(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public Portfolio(Long id, String name, User user, String idInflux) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.idInflux = idInflux;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne(fetch= FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "userId" ,referencedColumnName="id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getIdInflux() {
        return idInflux;
    }

    public void setIdInflux(String idInflux) {
        this.idInflux = idInflux;
    }
}
