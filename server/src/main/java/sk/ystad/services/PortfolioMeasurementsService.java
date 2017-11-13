package sk.ystad.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.measures.database_objects.ImmutableMeasure;
import sk.ystad.model.measures.repositores.PortfolioMeasurementRepository;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeries;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/measurements")
public class PortfolioMeasurementsService {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final PortfolioMeasurementRepository portfolioMeasurementRepository;

    @Autowired
    PortfolioMeasurementsService(PortfolioMeasurementRepository portfolioMeasurementRepository) {
        this.portfolioMeasurementRepository = portfolioMeasurementRepository;
    }

    @GetMapping("/cumulative_measurement")
    public JSONArray cumulativeMeasurement(@RequestParam(value = "portfolioId") String portfolioId, @RequestParam(value="dateFrom") String dateFrom,
                               @RequestParam(value="dateTo") String dateTo) throws Exception {
        LocalDate localDateFrom = LocalDate.parse(dateFrom, formatter);
        LocalDate localDateTo = LocalDate.parse(dateTo, formatter);

        ImmutableMeasure immutableMeasure = ImmutableMeasure.of("PORTFOLIO_CUMULATIVE_RETURN");
        LocalDateDoubleTimeSeries timeSeries = portfolioMeasurementRepository.findMeasure(portfolioId, immutableMeasure, localDateFrom, localDateTo);

        JSONArray dataJson = new JSONArray();

        for (int i = 0; i < timeSeries.size(); i++) {
            JSONObject tmpObject = new JSONObject();
            tmpObject.put("name", timeSeries.times().get(i));
            tmpObject.put("value", timeSeries.values().get(i));
            dataJson.put(tmpObject);
        }

        return dataJson;
    }

}
