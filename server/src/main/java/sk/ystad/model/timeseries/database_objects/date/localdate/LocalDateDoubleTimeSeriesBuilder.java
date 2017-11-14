package sk.ystad.model.timeseries.database_objects.date.localdate;

import sk.ystad.model.timeseries.database_objects.date.DateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.DateDoubleTimeSeriesBuilder;
import sk.ystad.model.timeseries.database_objects.date.DateTimeSeries;

import java.time.LocalDate;
import java.util.Map;

/**
 * A builder of time-series that stores {@code double} data values against {@code LocalDate} dates.
 * <p>
 * The "time" key to the time-series is a {@code LocalDate}.
 * See {@link DateTimeSeries} for details about the "time" represented as an {@code int}.
 */
public interface LocalDateDoubleTimeSeriesBuilder extends DateDoubleTimeSeriesBuilder<LocalDate> {

    @Override
        // override for covariant return type
    LocalDateDoubleEntryIterator iterator();

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder put(LocalDate time, double value);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder put(int time, double value);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder putAll(LocalDate[] times, double[] values);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder putAll(int[] times, double[] values);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder putAll(DateDoubleTimeSeries<?> timeSeries);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder putAll(DateDoubleTimeSeries<?> timeSeries, int startPos, int endPos);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder putAll(Map<LocalDate, Double> timeSeriesMap);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder clear();

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries build();

}