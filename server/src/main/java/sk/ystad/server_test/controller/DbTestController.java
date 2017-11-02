package sk.ystad.server_test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sk.ystad.server_test.model.database_objects.DatabaseConnectionTestObject;
import sk.ystad.server_test.model.repositories.DbConnectionTestRepository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/test_local_dbs")
public class DbTestController {

    private final DbConnectionTestRepository connectionTestRepository;

    @Autowired
    public DbTestController(DbConnectionTestRepository connectionTestRepository) {
        this.connectionTestRepository = connectionTestRepository;
    }

    @RequestMapping("/save")
    public String createTestDatabase() {
        try {
            connectionTestRepository.save(new DatabaseConnectionTestObject("Jack", "Smith"));
            connectionTestRepository.save(new DatabaseConnectionTestObject("Adam", "Johnson"));
            connectionTestRepository.save(new DatabaseConnectionTestObject("Kim", "Smith"));
            connectionTestRepository.save(new DatabaseConnectionTestObject("David", "Williams"));
            connectionTestRepository.save(new DatabaseConnectionTestObject("Peter", "Davis"));
            return "Done";
        } catch (Exception e) {
            return "Not done";
        }
    }

    @RequestMapping("/get_all")
    public List<DatabaseConnectionTestObject> findAll() {
        Iterable<DatabaseConnectionTestObject> result = connectionTestRepository.findAll();
        return (List<DatabaseConnectionTestObject>) result;
    }

    @RequestMapping("/find_by_id")
    public DatabaseConnectionTestObject findById(@RequestParam("id") long id) {
        return connectionTestRepository.findOne(id);
    }

    @RequestMapping("/find_by_name")
    public List<DatabaseConnectionTestObject> findTestObjectByName(@RequestParam("name") String name) {
        Iterable<DatabaseConnectionTestObject> result = connectionTestRepository.findByName(name);
        return (List<DatabaseConnectionTestObject>) result;
    }

    @RequestMapping("/find_by_surname")
    public List<DatabaseConnectionTestObject> findTestObjectBySurname(@RequestParam("surname") String surname) {
        Iterable<DatabaseConnectionTestObject> result = connectionTestRepository.findBySurname(surname);
        return (List<DatabaseConnectionTestObject>) result;
    }

//    @RequestMapping("/test_raw_query")
//    public List<DatabaseConnectionTestObject> testRawQuery() {
//        List<DatabaseConnectionTestObject> resultList = null;
//        resultList = new DbRawQueryTest().testConnection();
//        return resultList;
//    }

}
