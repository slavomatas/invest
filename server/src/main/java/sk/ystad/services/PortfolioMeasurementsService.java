package sk.ystad.services;

import io.swagger.annotations.ApiOperation;
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

    @CrossOrigin(origins = "*")
    @GetMapping("/cumulative_measurement")
    @ApiOperation(value = "Get cumulative measurements for portfolio", notes = "Array of cumulative measurements for given portfolio can be provided.")
    public String cumulativeMeasurement(@RequestParam(value = "portfolioId") String portfolioId, @RequestParam(value="dateFrom", required=false) String dateFrom,
                               @RequestParam(value="dateTo", required=false) String dateTo) throws Exception {
        LocalDate localDateFrom = null;
        LocalDate localDateTo = null;
        if (dateFrom != null) {
            localDateFrom = LocalDate.parse(dateFrom, formatter);
        }
        if (dateTo != null) {
            localDateTo = LocalDate.parse(dateTo, formatter);
        }

        ImmutableMeasure immutableMeasure = ImmutableMeasure.of("PORTFOLIO_CUMULATIVE_RETURN");
        LocalDateDoubleTimeSeries timeSeries = portfolioMeasurementRepository.findMeasure(portfolioId, immutableMeasure, localDateFrom, localDateTo);

        JSONArray dataJson = new JSONArray();

        for (int i = 0; i < timeSeries.size(); i++) {
            JSONObject tmpObject = new JSONObject();
            tmpObject.put("name", timeSeries.times().get(i));
            tmpObject.put("value", timeSeries.values().get(i));
            dataJson.put(tmpObject);
        }

        return dataJson.toString();
    }

}
