package sk.ystad.common.config;

import org.hibernate.dialect.PostgreSQL9Dialect;
import org.hibernate.dialect.function.StandardSQLFunction;

public class CustomPostgreSQLDialectConfig extends PostgreSQL9Dialect{

    public CustomPostgreSQLDialectConfig(){
        super();
        registerFunction("ts_rank_cd", new StandardSQLFunction("ts_rank_cd"));
        registerFunction("to_tsvector", new StandardSQLFunction("to_tsvector"));
        registerFunction("to_tsquery", new StandardSQLFunction("to_tsquery"));
    }

}
