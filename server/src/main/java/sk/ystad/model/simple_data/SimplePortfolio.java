package sk.ystad.model.simple_data;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.model.users.portfolios.positions.Trade;

import java.util.ArrayList;
import java.util.List;

public class SimplePortfolio {
    private long portfolioId;
    private List<SimpleTrade> trades;

    public SimplePortfolio(Portfolio portfolio) {
        portfolioId = portfolio.getId();
        trades = createSimpleTrades(portfolio.getAllTrades());
    }

    private List<SimpleTrade> createSimpleTrades(List<Trade> allTrades) {
        List<SimpleTrade> trades = new ArrayList<>();
        for (Trade trade : allTrades) {
            trades.add(new SimpleTrade(trade));
        }
        return trades;
    }

    public String toJson() throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("portfolio_id", portfolioId);
        JSONArray tradesArray = new JSONArray();
        for (SimpleTrade trade : trades) {
            tradesArray.put(trade.toJson());
        }
        jsonObject.put("trades", tradesArray);
        return jsonObject.toString();
    }
}