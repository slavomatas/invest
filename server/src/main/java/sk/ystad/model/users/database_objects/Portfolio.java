package sk.ystad.model.users.database_objects;
import javax.jws.soap.SOAPBinding;
import javax.persistence.*;

@Entity
public class Portfolio {

    private Long id;

    @Column(name = "name")
    private String name;



    private User user;

    public  Portfolio(){

    }
    public Portfolio(String name, User user) {
        this.name = name;
        this.user = user;
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
    @JoinColumn(name = "userId")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
