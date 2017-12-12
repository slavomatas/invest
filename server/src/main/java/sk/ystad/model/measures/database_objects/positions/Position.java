package sk.ystad.model.measures.database_objects.positions;

public class Position {

    private String symbol;
    private Double value;

    public Position(String symbol, Double  value) {
        this.symbol = symbol;
        this.value = value;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
