package sk.ystad.model.securities.repositories;

import sk.ystad.model.securities.database_objects.Security;

public interface SecurityRepositoryCustom {
    void saveCascade(Security security);
}
