package sk.ystad.server_test.controller;

import org.apache.log4j.Logger;
import sk.ystad.server_test.model.database_objects.DatabaseConnectionTestObject;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DbRawQueryTest {
    static Logger log = Logger.getLogger(DbRawQueryTest.class.getName());

    public DbRawQueryTest() {

    }

    public List<DatabaseConnectionTestObject> testConnection() {
        Connection connection = null;
        Statement stmt = null;
        List<DatabaseConnectionTestObject> resultList = new ArrayList<>();
        ResultSet rs = null;
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/invest", "postgres", "admin");
            long start = System.nanoTime();
            stmt = connection.createStatement();
            rs = stmt.executeQuery("SELECT * FROM connection_test_table WHERE id = 10 LIMIT 1;");
            while (rs.next()) {
                DatabaseConnectionTestObject tmpDbObject = new DatabaseConnectionTestObject(rs.getInt("id"),
                        rs.getString("name"), rs.getString("surname"));
                resultList.add(tmpDbObject);
            }
            log.error("timeOfGetting and parsing = " + Math.abs(start - System.nanoTime()));
        } catch (ClassNotFoundException e) {
            log.error("PostgresSql driver not found, check dependecies or External libraries " + e.getMessage());
            e.printStackTrace();
        } catch (SQLException e) {
            log.error("Error in executing one of sql methods " + e.getMessage());
            e.printStackTrace();
        } finally {
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return resultList;
    }

}
