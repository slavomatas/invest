package sk.ystad.controllers;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.users.portfolios.Portfolio;
import sk.ystad.repositories.users.PortfolioRepository;
import sk.ystad.services.PortfolioMeasurementsService;
import sk.ystad.services.PortfolioService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class PortfolioMeasurementsController {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    private final PortfolioMeasurementsService portfolioMeasurementsService;
    private final PortfolioService portfolioService;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public PortfolioMeasurementsController(PortfolioMeasurementsService portfolioMeasurementsService, PortfolioService portfolioService, PortfolioRepository portfolioRepository) {
        this.portfolioMeasurementsService = portfolioMeasurementsService;
        this.portfolioService = portfolioService;
        this.portfolioRepository = portfolioRepository;
    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get cumulative measurements for portfolio", notes = "Array of cumulative measurements of given measurement type for given portfolio can be provided.")
    @GetMapping("/measurements/portfolios/{portfolioId}/{measurementType}")
    public ResponseEntity getMeasurement(@PathVariable("portfolioId") Long portfolioId,
                                         @PathVariable("measurementType") String measurementType,
                                         @RequestParam(value = "dateFrom", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
                                         @RequestParam(value = "dateTo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo) throws Exception {

        return portfolioMeasurementsService.getMeasurement(portfolioId, measurementType, dateFrom, dateTo);

    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get cumulative measurements for portfolio", notes = "Array of cumulative measurements of given measurement type for given portfolio can be provided.")
    @GetMapping("/measurements/portfolios/{portfolioId}/PORTFOLIO_MARKET_VALUE")
    public ResponseEntity getMeasurementMarket(@PathVariable("portfolioId") Long portfolioId,
                                               @RequestParam(value = "dateFrom", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
                                               @RequestParam(value = "dateTo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo) throws Exception {


        return portfolioMeasurementsService.getMeasurementMarket(portfolioId, dateFrom, dateTo);

    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get details for portfolio", notes = "Array of positions with market value for given portfolio can be provided.")
    @GetMapping("/user/portfolios/{portfolioId}/positions")
    public ResponseEntity getPositionsWithMarketValue(@PathVariable("portfolioId") Long portfolioId) {
        return new ResponseEntity<>(portfolioService.getPositionsWithMarketValue(portfolioId), HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get positions with market value for portfolio", notes = "Array of positions with market value for given portfolio can be provided.")
    @GetMapping("/user/portfolios/{portfolioId}/details")
    public ResponseEntity getPortfolioDetails(@PathVariable("portfolioId") Long portfolioId) {
        return new ResponseEntity<>(portfolioService.getPortfolioDetails(portfolioId), HttpStatus.OK);
    }

}
