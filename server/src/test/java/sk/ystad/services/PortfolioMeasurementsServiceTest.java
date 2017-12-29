package sk.ystad.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import sk.ystad.ServerApplication;
import sk.ystad.model.measures.database_objects.ImmutableMeasure;
import sk.ystad.model.measures.repositores.PortfolioMeasurementRepository;
import sk.ystad.model.timeseries.database_objects.date.localdate.ImmutableLocalDateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeriesBuilder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServerApplication.class)
@WebAppConfiguration
public class PortfolioMeasurementsServiceTest {

    private MockMvc mvc;

    @Autowired
    private WebApplicationContext wac;

    @MockBean
    private PortfolioMeasurementRepository portfolioMeasurementRepository;

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Before
    public void setup() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void returnCumulativeMeasurementsForGivenPortfolio() throws Exception {
        LocalDateDoubleTimeSeriesBuilder builder = ImmutableLocalDateDoubleTimeSeries.builder();
        builder.put(LocalDate.parse("2017-01-01", formatter), 1.5);
        builder.put(LocalDate.parse("2017-01-02", formatter), 2.5);
        builder.put(LocalDate.parse("2017-01-03", formatter), 3.5);
        builder.put(LocalDate.parse("2017-01-04", formatter), 1.7);
        builder.put(LocalDate.parse("2017-01-05", formatter), 1.4);
        builder.put(LocalDate.parse("2017-01-06", formatter), 0.2);
        builder.put(LocalDate.parse("2017-01-07", formatter), 3.0);
        LocalDateDoubleTimeSeries timeSeries = builder.build();

        Long portfolioId = 1L;
        ImmutableMeasure immutableMeasure = ImmutableMeasure.of("PORTFOLIO_CUMULATIVE_RETURN");
        String dateFrom = "2017-01-01T21:03:59.526Z";
        LocalDate localDateFrom = LocalDate.parse(dateFrom, DateTimeFormatter.ISO_DATE_TIME);
        String dateTo = "2017-01-07T21:03:59.526Z";
        LocalDate localDateTo = LocalDate.parse(dateTo, DateTimeFormatter.ISO_DATE_TIME);
        Mockito.when(portfolioMeasurementRepository.findMeasure("PID5a03486d2298316ac85459bf", immutableMeasure, localDateFrom, localDateTo))
                .thenReturn(timeSeries);

        mvc.perform(get("/v1/measurements/portfolios/1/PORTFOLIO_CUMULATIVE_RETURN")
                .contentType(MediaType.APPLICATION_JSON)
                .param("dateFrom", dateFrom)
                .param("dateTo", dateTo))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(timeSeries.getTimeAtIndex(0).toString()))
                .andExpect(jsonPath("$[0].value").value(timeSeries.getValueAtIndex(0)))
                .andExpect(jsonPath("$[1].name").value(timeSeries.getTimeAtIndex(1).toString()))
                .andExpect(jsonPath("$[1].value").value(timeSeries.getValueAtIndex(1)))
                .andExpect(jsonPath("$[2].name").value(timeSeries.getTimeAtIndex(2).toString()))
                .andExpect(jsonPath("$[2].value").value(timeSeries.getValueAtIndex(2)))
                .andExpect(jsonPath("$[3].name").value(timeSeries.getTimeAtIndex(3).toString()))
                .andExpect(jsonPath("$[3].value").value(timeSeries.getValueAtIndex(3)))
                .andExpect(jsonPath("$[4].name").value(timeSeries.getTimeAtIndex(4).toString()))
                .andExpect(jsonPath("$[4].value").value(timeSeries.getValueAtIndex(4)))
                .andExpect(jsonPath("$[5].name").value(timeSeries.getTimeAtIndex(5).toString()))
                .andExpect(jsonPath("$[5].value").value(timeSeries.getValueAtIndex(5)))
                .andExpect(jsonPath("$[6].name").value(timeSeries.getTimeAtIndex(6).toString()))
                .andExpect(jsonPath("$[6].value").value(timeSeries.getValueAtIndex(6)));
    }

}
