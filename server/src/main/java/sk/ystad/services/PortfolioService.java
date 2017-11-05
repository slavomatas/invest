package sk.ystad.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.measures.database_objects.ImmutableMeasure;
import sk.ystad.model.measures.database_objects.Measures;
import sk.ystad.model.measures.repositores.PortfolioMeasureRepository;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeries;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/portfolios")
public class PortfolioService {

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Autowired
    PortfolioMeasureRepository portfolioMeasureRepository;

    @GetMapping("/availableMeasureTypes")
    public String availableMeasureTypes() throws Exception {
        JSONObject resultJsonObject = new JSONObject();
        JSONObject dataJsonObject = new JSONObject();

        JSONArray measuresTypesJsonArray = new JSONArray();
        measuresTypesJsonArray.put(Measures.POSITION_WEIGHTS.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_MARKET_VALUE.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_DAILY_RETURN.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_WEEKLY_RETURN.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_MONTHLY_RETURN.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_QUARTERLY_RETURN.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_YEARLY_RETURN.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_CUMULATIVE_RETURN.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_DRAWDOWNS.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_PERF_STATS.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_COMPONENT_PERF_STATS.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_RISK_STATS.getName());
        measuresTypesJsonArray.put(Measures.PORTFOLIO_COMPONENT_RISK_STATS.getName());

        dataJsonObject.put("measureTypes", measuresTypesJsonArray);

        resultJsonObject.put("data", dataJsonObject);
        return resultJsonObject.toString();
    }

    @GetMapping("/{id}/findMeasure")
    public String findByUserId(@PathVariable(value = "id") String portfolioId, @RequestParam(value="dateFrom") String dateFrom,
                               @RequestParam(value="dateTo") String dateTo, @RequestParam(value="measureType") String measureType) throws Exception {
        ImmutableMeasure immutableMeasure = ImmutableMeasure.of(measureType);
        LocalDate localDateFrom = LocalDate.parse(dateFrom, formatter);
        LocalDate localDateTo = LocalDate.parse(dateTo, formatter);

        LocalDateDoubleTimeSeries timeSeries = portfolioMeasureRepository.findMeasure(portfolioId, immutableMeasure, localDateFrom, localDateTo);

        JSONObject resultJsonObject = new JSONObject();
        resultJsonObject.put("portfolioId", portfolioId);
        resultJsonObject.put("measureType", measureType);

        JSONObject dataJsonObject = new JSONObject();

        JSONArray measuresJsonArray = new JSONArray();
        for (int i = 0; i < timeSeries.size(); i++) {
            JSONArray tmpJsonArray = new JSONArray();
            tmpJsonArray.put(timeSeries.times().get(i));
            tmpJsonArray.put(timeSeries.values().get(i));
            measuresJsonArray.put(tmpJsonArray);
        }
        dataJsonObject.put("measures", measuresJsonArray);

        resultJsonObject.put("data", dataJsonObject);
        return resultJsonObject.toString();
    }

}
