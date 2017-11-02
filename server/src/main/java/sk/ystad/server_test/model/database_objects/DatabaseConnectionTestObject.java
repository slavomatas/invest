package sk.ystad.server_test.model.database_objects;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "connection_test_table")
public class DatabaseConnectionTestObject implements Serializable {

    private static final long serialVersionUID = -260238531602151771L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    protected DatabaseConnectionTestObject() {

    }

    public DatabaseConnectionTestObject(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public DatabaseConnectionTestObject(int id, String name, String surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
