package sk.ystad.model.measurements.positions;

public class Position {

    private String symbol;
    private Double value;

    public Position(String symbol, Double  value) {
        this.symbol = symbol;
        this.value = value;
    }

    public Position() {
    }

    public String getSymbol() {
        // Parse the symbol string
        String s = symbol;
        try {
            s = s.substring(s.indexOf("[") + 1);
            s = s.substring(0, s.indexOf("]"));
        }
        catch ( StringIndexOutOfBoundsException e) {
            return symbol;
        }


        return s;

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
