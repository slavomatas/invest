package sk.ystad.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import sk.ystad.ServerApplication;
import sk.ystad.model.measurements.ImmutableMeasure;
import sk.ystad.model.timeseries.TimeSeriesSimpleItem;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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
    private PortfolioMeasurementsService portfolioMeasurementsService;

    @Before
    public void setup() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void returnCumulativeMeasurementsForGivenPortfolio() throws Exception {
        List<TimeSeriesSimpleItem> timeSeries = new ArrayList<>();
        timeSeries.add(new TimeSeriesSimpleItem("2017-01-01T21:03:59.526Z", 1.02));
        timeSeries.add(new TimeSeriesSimpleItem("2017-01-02T21:03:59.526Z", 1.02));
        timeSeries.add(new TimeSeriesSimpleItem("2017-01-03T21:03:59.526Z", 2.023));
        timeSeries.add(new TimeSeriesSimpleItem("2017-01-04T21:03:59.526Z", 2.03));
        timeSeries.add(new TimeSeriesSimpleItem("2017-01-05T21:03:59.526Z", 3.05));
        timeSeries.add(new TimeSeriesSimpleItem("2017-01-06T21:03:59.526Z", 4.045));
        timeSeries.add(new TimeSeriesSimpleItem("2017-01-07T21:03:59.526Z", 6.06));

        String dateFrom = "2017-01-01T21:03:59.526Z";
        LocalDateTime localDateFrom = LocalDateTime.parse(dateFrom, DateTimeFormatter.ISO_DATE_TIME);
        String dateTo = "2017-01-07T21:03:59.526Z";
        LocalDateTime localDateTo = LocalDateTime.parse(dateTo, DateTimeFormatter.ISO_DATE_TIME);
        Mockito.when(portfolioMeasurementsService.getMeasurement(5L, "PORTFOLIO_CUMULATIVE_RETURN", localDateFrom, localDateTo))
                .thenReturn(new ResponseEntity<>(timeSeries, HttpStatus.OK));

        mvc.perform(get("/v1/measurements/portfolios/5/PORTFOLIO_CUMULATIVE_RETURN")
                .contentType(MediaType.APPLICATION_JSON)
                .param("dateFrom", dateFrom)
                .param("dateTo", dateTo))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(timeSeries.get(0).getName()))
                .andExpect(jsonPath("$[0].value").value(timeSeries.get(0).getValue()))
                .andExpect(jsonPath("$[1].name").value(timeSeries.get(1).getName()))
                .andExpect(jsonPath("$[1].value").value(timeSeries.get(1).getValue()))
                .andExpect(jsonPath("$[2].name").value(timeSeries.get(2).getName()))
                .andExpect(jsonPath("$[2].value").value(timeSeries.get(2).getValue()))
                .andExpect(jsonPath("$[3].name").value(timeSeries.get(3).getName()))
                .andExpect(jsonPath("$[3].value").value(timeSeries.get(3).getValue()))
                .andExpect(jsonPath("$[4].name").value(timeSeries.get(4).getName()))
                .andExpect(jsonPath("$[4].value").value(timeSeries.get(4).getValue()))
                .andExpect(jsonPath("$[5].name").value(timeSeries.get(5).getName()))
                .andExpect(jsonPath("$[5].value").value(timeSeries.get(5).getValue()))
                .andExpect(jsonPath("$[6].name").value(timeSeries.get(6).getName()))
                .andExpect(jsonPath("$[6].value").value(timeSeries.get(6).getValue()));
    }

}
