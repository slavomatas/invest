package sk.ystad.model.securities.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import sk.ystad.model.securities.database_objects.Security;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class SecurityRepositoryImpl implements SecurityRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public void saveCascade(Security security){
        em.persist(security.getSecurityData());
    }
}
