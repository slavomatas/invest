package sk.ystad.model.users.database_objects;

import sk.ystad.model.measures.database_objects.positions.Position;

import java.util.List;

public class PortfolioDetails {
    private String name;
    private Long id;
    private Double marketValue;
    private Double oldMarketValue;
    private Returns returns;
    private List<Position> positions;


    public PortfolioDetails(String name,
                            Long id,
                            Double marketValue,
                            Double oldMarketValue,
                            Returns returns,
                            List<Position> positions) {
        this.name = name;
        this.id = id;
        this.marketValue = marketValue;
        this.oldMarketValue = oldMarketValue;
        this.returns = returns;
        this.positions = positions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(Double marketValue) {
        this.marketValue = marketValue;
    }

    public Double getOldMarketValue() {
        return oldMarketValue;
    }

    public void setOldMarketValue(Double oldMarketValue) {
        this.oldMarketValue = oldMarketValue;
    }

    public Returns getReturns() {
        return returns;
    }

    public void setReturns(Returns returns) {
        this.returns = returns;
    }

    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

}
