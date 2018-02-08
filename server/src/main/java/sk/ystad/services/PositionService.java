package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.users.portfolios.positions.UserPosition;
import sk.ystad.repositories.users.PositionRepository;

@Service
public class PositionService {

    private final PositionRepository positionRepository;

    @Autowired
    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    /**
     * Return position by it's id
     * @param positionId
     * @return
     */
    public UserPosition getPosition(long positionId) {
        return positionRepository.findOne(positionId);
    }
}
