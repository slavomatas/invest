package sk.ystad.model.users.database_objects;

import javax.persistence.*;
import java.util.List;


//TODO inherent from Spring class "User" and implement User Authetication

@Entity
@Table(name = "users")
public class User {

    private long userId;


    private List<Portfolio> portfolios;

    public User() {

    }

    public User(long userId) {
        this.userId = userId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getUserId() {
        return userId;
    }


    public void setUserId(long userId) {
        this.userId = userId;
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="user")
    public List<Portfolio> getPortfolios() {
        return portfolios;
    }

    public void setPortfolios(List<Portfolio> portfolios) {
        this.portfolios = portfolios;
    }
}
