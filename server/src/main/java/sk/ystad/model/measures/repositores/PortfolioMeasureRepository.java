package sk.ystad.model.measures.repositores;

import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.stereotype.Repository;
import sk.ystad.model.measures.database_objects.Measure;
import sk.ystad.model.timeseries.database_objects.date.localdate.ImmutableLocalDateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.localdate.LocalDateDoubleTimeSeriesBuilder;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Repository
public class PortfolioMeasureRepository {

    private InfluxDB influxDB;
    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public PortfolioMeasureRepository(final InfluxDB influxDB) {
        this.influxDB = influxDB;
    }

    public LocalDateDoubleTimeSeries findMeasure(String portfolioId, Measure measure, LocalDate dateFrom, LocalDate dateTo) {
        LocalDateDoubleTimeSeriesBuilder builder = ImmutableLocalDateDoubleTimeSeries.builder();

        String queryStr = String.format("SELECT * FROM %s GROUP BY *", portfolioId);
        Query query = new Query(queryStr, measure.getName());
        QueryResult queryResult = this.influxDB.query(query);

        List<QueryResult.Result> results = queryResult.getResults();
        if (results != null && results.size() > 0) {
            QueryResult.Result result = results.get(0);
            List<QueryResult.Series> resultSeries = result.getSeries();
            if (resultSeries != null && resultSeries.size() > 0) {
                QueryResult.Series series = resultSeries.get(0);
                List<List<Object>> values = series.getValues();
                for (List<Object> rowValues : values) {
                    try {
                        Date date = simpleDateFormat.parse((String) rowValues.get(0));
                        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                        Double value = (Double) rowValues.get(1);
                        builder.put(localDate, value);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }

        LocalDateDoubleTimeSeries timeSeries = builder.build();
        LocalDateDoubleTimeSeries subTimeSeries = timeSeries.subSeries(dateFrom, dateTo);
        return subTimeSeries;
    }

}
