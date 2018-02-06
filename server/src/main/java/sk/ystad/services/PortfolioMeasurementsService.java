package sk.ystad.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sk.ystad.model.measurements.ImmutableMeasure;
import sk.ystad.model.measurements.Measures;
import sk.ystad.model.measurements.positions.Position;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;
import sk.ystad.model.users.portfolios.PortfolioDetails;
import sk.ystad.model.users.portfolios.Returns;
import sk.ystad.repositories.measurements.PortfolioMeasurementRepository;
import sk.ystad.repositories.users.PortfolioRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioMeasurementsService {

    private final PortfolioMeasurementRepository portfolioMeasurementRepository;
    private final PortfolioRepository portfolioRepository;

    @Autowired
    public PortfolioMeasurementsService(PortfolioMeasurementRepository portfolioMeasurementRepository, PortfolioRepository portfolioRepository) {
        this.portfolioMeasurementRepository = portfolioMeasurementRepository;
        this.portfolioRepository = portfolioRepository;
    }


    public List<TimeSeriesSimpleItem> getMeasurement(Long portfolioId, String measurementType, LocalDateTime dateFrom, LocalDateTime dateTo) {
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

    public List<TimeSeriesSimpleItem> getMeasurementMarket(Long portfolioId, LocalDateTime dateFrom, LocalDateTime dateTo) {
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

    public List<Position> getPositionsWithMarketValue(Long portfolioId) {
        String influxId = this.portfolioRepository.findOne(portfolioId).getIdInflux();
        return portfolioMeasurementRepository.getPositionsWithMarketValue(influxId);
    }

    public PortfolioDetails getPortfolioDetails(Long portfolioId) {
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
