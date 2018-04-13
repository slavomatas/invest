package sk.ystad.model.simple_data;

import org.json.JSONException;
import org.json.JSONObject;
import sk.ystad.model.users.portfolios.positions.Trade;

import java.util.Date;

public class SimpleTrade {

    private String symbol;
    private double amount;
    private Date date;

    public SimpleTrade(Trade trade) {
        symbol = trade.getPosition().getSecurity().getSymbol();
        amount = trade.getAmount();
        date = trade.getDateTime();
    }

    public String getSymbol() {
        return symbol;
    }

    public double getAmount() {
        return amount;
    }

    public Date getDate() {
        return date;
    }

    public JSONObject toJson() throws JSONException {
        JSONObject json = new JSONObject();
        json.put("symbol", symbol);
        json.put("quantity", amount);
        json.put("trade_date", date);
        return json;
    }
}
