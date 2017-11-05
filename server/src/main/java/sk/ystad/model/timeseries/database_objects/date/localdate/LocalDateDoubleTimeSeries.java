package sk.ystad.model.timeseries.database_objects.date.localdate;

import sk.ystad.model.timeseries.database_objects.DoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.DoubleTimeSeriesOperators;
import sk.ystad.model.timeseries.database_objects.date.DateDoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.date.DateTimeSeries;

import java.time.LocalDate;

/**
 * A time series that stores {@code double} data values against {@code LocalDate} dates.
 * <p>
 * The "time" key to the time-series is a {@code LocalDate}.
 * See {@link DateTimeSeries} for details about the "time" represented as an {@code int}.
 */
public interface LocalDateDoubleTimeSeries
        extends DateDoubleTimeSeries<LocalDate> {

    /**
     * Gets an iterator over the date-value pairs.
     * <p>
     * Although the pairs are expressed as instances of {@code Map.Entry},
     * it is recommended to use the primitive methods on {@code LocalDateDoubleIterator}.
     *
     * @return the iterator, not null
     */
    @Override
    // override for covariant return type
    LocalDateDoubleEntryIterator iterator();

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries subSeries(LocalDate startTime, LocalDate endTime);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries subSeries(LocalDate startTime, boolean includeStart, LocalDate endTime, boolean includeEnd);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries head(int numItems);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries tail(int numItems);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries lag(int lagCount);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries add(double amountToAdd);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries add(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionAdd(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries subtract(double amountToSubtract);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries subtract(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionSubtract(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries multiply(double amountToMultiplyBy);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries multiply(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionMultiply(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries divide(double amountToDivideBy);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries divide(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionDivide(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries power(double power);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries power(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionPower(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries minimum(double minValue);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries minimum(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionMinimum(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries maximum(double maxValue);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries maximum(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionMaximum(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries average(double value);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries average(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionAverage(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries intersectionFirstValue(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries intersectionSecondValue(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries noIntersectionOperation(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries negate();

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries reciprocal();

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries log();

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries log10();

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries abs();

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries subSeriesFast(int startTime, int endTime);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries subSeriesFast(int startTime, boolean includeStart, int endTime, boolean includeEnd);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeries operate(DoubleTimeSeriesOperators.UnaryOperator operator);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries operate(double other, DoubleTimeSeriesOperators.BinaryOperator operator);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries operate(DateDoubleTimeSeries<?> otherTimeSeries, DoubleTimeSeriesOperators.BinaryOperator operator);

    @Override
        // override for covariant return type
    LocalDateDoubleTimeSeries unionOperate(DateDoubleTimeSeries<?> otherTimeSeries, DoubleTimeSeriesOperators.BinaryOperator operator);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    LocalDateDoubleTimeSeriesBuilder toBuilder();

    /**
     * Obtain a new time-series with the same times and new values
     *
     * @param values the new values, not null
     * @return time series, not null
     */
    LocalDateDoubleTimeSeries withValues(double[] values);

}
