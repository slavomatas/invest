package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.measurements.ImmutableMeasure;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.repositories.measurements.PortfolioMeasurementRepository;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;
import sk.ystad.model.users.portfolios.PortfolioDetails;
import sk.ystad.model.users.portfolios.Returns;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.services.PortfolioMeasurementsService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class PortfolioMeasurementsController {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    final
    PortfolioMeasurementsService portfolioMeasurementsService;

    @Autowired
    public PortfolioMeasurementsController(PortfolioMeasurementsService portfolioMeasurementsService) {
        this.portfolioMeasurementsService = portfolioMeasurementsService;
    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get cumulative measurements for portfolio", notes = "Array of cumulative measurements of given measurement type for given portfolio can be provided.")
    @GetMapping("/measurements/portfolios/{portfolioId}/{measurementType}")
    public List<TimeSeriesSimpleItem> getMeasurement(@PathVariable("portfolioId") Long portfolioId,
                                                 @PathVariable("measurementType") String measurementType,
                                                 @RequestParam(value="dateFrom", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
                                                 @RequestParam(value="dateTo", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo) throws Exception {

        return portfolioMeasurementsService.getMeasurement(portfolioId, measurementType, dateFrom, dateTo);

    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get cumulative measurements for portfolio", notes = "Array of cumulative measurements of given measurement type for given portfolio can be provided.")
    @GetMapping("/measurements/portfolios/{portfolioId}/PORTFOLIO_MARKET_VALUE")
    public List<TimeSeriesSimpleItem> getMeasurementMarket(@PathVariable("portfolioId") Long portfolioId,
                                                     @RequestParam(value="dateFrom", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
                                                     @RequestParam(value="dateTo", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo) throws Exception {


        return portfolioMeasurementsService.getMeasurementMarket(portfolioId, dateFrom, dateTo);

    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get details for portfolio", notes = "Array of positions with market value for given portfolio can be provided.")
    @GetMapping("/user/portfolios/{portfolioId}/positions")
    public List<Position> getPositionsWithMarketValue(@PathVariable("portfolioId") Long portfolioId) {
        return portfolioMeasurementsService.getPositionsWithMarketValue(portfolioId);
    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get positions with market value for portfolio", notes = "Array of positions with market value for given portfolio can be provided.")
    @GetMapping("/user/portfolios/{portfolioId}/details")
    public PortfolioDetails getPortfolioDetails(@PathVariable("portfolioId") Long portfolioId) {
        return portfolioMeasurementsService.getPortfolioDetails(portfolioId);
    }

}