package sk.ystad.services;

import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import sk.ystad.model.measures.database_objects.ImmutableMeasure;
import sk.ystad.model.measures.database_objects.Measure;
import sk.ystad.model.measures.database_objects.Measures;
import sk.ystad.model.measures.database_objects.positions.Position;
import sk.ystad.model.measures.repositores.PortfolioMeasurementRepository;
import sk.ystad.model.timeseries.database_objects.TimeSeriesSimpleItem;
import sk.ystad.model.users.database_objects.PortfolioDetails;
import sk.ystad.model.users.database_objects.Returns;
import sk.ystad.model.users.repositores.PortfolioRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class PortfolioMeasurementsService {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final PortfolioMeasurementRepository portfolioMeasurementRepository;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    PortfolioMeasurementsService(PortfolioMeasurementRepository portfolioMeasurementRepository,
                                 PortfolioRepository portfolioRepository) {
        this.portfolioMeasurementRepository = portfolioMeasurementRepository;
        this.portfolioRepository = portfolioRepository;
    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get cumulative measurements for portfolio", notes = "Array of cumulative measurements of given measurement type for given portfolio can be provided.")
    @GetMapping("/measurements/portfolios/{portfolioId}/{measurementType}")
    public List<TimeSeriesSimpleItem> getMeasurement(@PathVariable("portfolioId") Long portfolioId,
                                                 @PathVariable("measurementType") String measurementType,
                                                 @RequestParam(value="dateFrom", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
                                                 @RequestParam(value="dateTo", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo) throws Exception {


        List<TimeSeriesSimpleItem> timeSeriesItems = new ArrayList<>();

        LocalDate localDateFrom = null;
        LocalDate localDateTo = null;
        if (dateFrom != null) {
            localDateFrom = dateFrom.toLocalDate();
        }
        if (dateTo != null) {
            localDateTo = dateTo.toLocalDate();
        }

        String influxId = this.portfolioRepository.findOne(portfolioId).getIdInflux();
        ImmutableMeasure immutableMeasure = ImmutableMeasure.of(measurementType);
        return portfolioMeasurementRepository.findMeasure(influxId, immutableMeasure, localDateFrom, localDateTo);


    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get cumulative measurements for portfolio", notes = "Array of cumulative measurements of given measurement type for given portfolio can be provided.")
    @GetMapping("/measurements/portfolios/{portfolioId}/PORTFOLIO_MARKET_VALUE")
    public List<TimeSeriesSimpleItem> getMeasurementMarket(@PathVariable("portfolioId") Long portfolioId,
                                                     @RequestParam(value="dateFrom", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
                                                     @RequestParam(value="dateTo", required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo) throws Exception {


        List<TimeSeriesSimpleItem> timeSeriesItems = new ArrayList<>();

        LocalDate localDateFrom = null;
        LocalDate localDateTo = null;
        if (dateFrom != null) {
            localDateFrom = dateFrom.toLocalDate();
        }
        if (dateTo != null) {
            localDateTo = dateTo.toLocalDate();
        }

        String influxId = this.portfolioRepository.findOne(portfolioId).getIdInflux();
        ImmutableMeasure immutableMeasure = ImmutableMeasure.of("PORTFOLIO_MARKET_VALUE");
        return portfolioMeasurementRepository.findMeasure(influxId, immutableMeasure, localDateFrom, localDateTo);


    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get details for portfolio", notes = "Array of positions with market value for given portfolio can be provided.")
    @GetMapping("/user/portfolios/{portfolioId}/positions")
    public List<Position> getPositionsWithMarketValue(@PathVariable("portfolioId") Long portfolioId) {
        String influxId = this.portfolioRepository.findOne(portfolioId).getIdInflux();
        return portfolioMeasurementRepository.getPositionsWithMarketValue(influxId);
    }

    @CrossOrigin(origins = "*")
    @ApiOperation(value = "Get positions with market value for portfolio", notes = "Array of positions with market value for given portfolio can be provided.")
    @GetMapping("/user/portfolios/{portfolioId}/details")
    public PortfolioDetails getPortfolioDetails(@PathVariable("portfolioId") Long portfolioId) {
        String influxId = this.portfolioRepository.findOne(portfolioId).getIdInflux();
        //Get position values of portfolio
        List<Position> positions =  portfolioMeasurementRepository.getPositionsWithMarketValue(influxId);

        //Get old and new market value of the portfolio
        ImmutableMeasure immutableMeasure = ImmutableMeasure.of(Measures.PORTFOLIO_MARKET_VALUE.getName());
        List<TimeSeriesSimpleItem> marketValues = portfolioMeasurementRepository.findMeasure(influxId, immutableMeasure, null, null);
        Double newMarketValue = marketValues.get(marketValues.size() - 1).getValue();
        Double oldMarketValue = marketValues.get(0).getValue();

        //Get returns of portfolio
        Returns returns = new Returns();
        immutableMeasure = ImmutableMeasure.of(Measures.PORTFOLIO_DAILY_RETURN.getName());
        List<TimeSeriesSimpleItem> portfolioReturns = portfolioMeasurementRepository.findMeasure(influxId, immutableMeasure, null, null);
        returns.setDaily(portfolioReturns.get(portfolioReturns.size() - 1).getValue());

        immutableMeasure = ImmutableMeasure.of(Measures.PORTFOLIO_WEEKLY_RETURN.getName());
        portfolioReturns = portfolioMeasurementRepository.findMeasure(influxId, immutableMeasure, null, null);
        returns.setWeekly(portfolioReturns.get(portfolioReturns.size() - 1).getValue());

        immutableMeasure = ImmutableMeasure.of(Measures.PORTFOLIO_CUMULATIVE_RETURN.getName());
        portfolioReturns = portfolioMeasurementRepository.findMeasure(influxId, immutableMeasure, null, null);
        returns.setCumulative(portfolioReturns.get(portfolioReturns.size() - 1).getValue());

        return new PortfolioDetails(this.portfolioRepository.findOne(portfolioId).getName(),
                portfolioId,
                newMarketValue,
                oldMarketValue,
                returns,
                positions);
    }

}
