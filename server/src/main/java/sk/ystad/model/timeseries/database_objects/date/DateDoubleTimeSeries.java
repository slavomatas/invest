package sk.ystad.model.timeseries.database_objects.date;

import sk.ystad.model.timeseries.database_objects.DoubleTimeSeries;
import sk.ystad.model.timeseries.database_objects.DoubleTimeSeriesOperators;

import java.util.NoSuchElementException;

/**
 * A time series that stores {@code double} data values against dates.
 * <p>
 * The "time" key to the time-series is a date.
 * See {@link DateTimeSeries} for details about the "time" represented as an {@code int}.
 *
 * @param <T> the date type
 */
public interface DateDoubleTimeSeries<T>
        extends DoubleTimeSeries<T>, DateTimeSeries<T, Double> {

    /**
     * Gets the value at the specified index.
     *
     * @param index the index to retrieve
     * @return the value at the index
     * @throws IndexOutOfBoundsException if the index is invalid
     */
    double getValueAtIndexFast(int index);

    // -------------------------------------------------------------------------

    /**
     * Gets the value at the earliest date in the series.
     *
     * @return the value at the earliest date
     * @throws NoSuchElementException if empty
     */
    double getEarliestValueFast();

    /**
     * Gets the value at the latest date in the series.
     *
     * @return the value at the latest date
     * @throws NoSuchElementException if empty
     */
    double getLatestValueFast();

    // -------------------------------------------------------------------------

    /**
     * Gets an iterator over the date-value pairs.
     * <p>
     * Although the pairs are expressed as instances of {@code Map.Entry},
     * it is recommended to use the primitive methods on {@code DateDoubleEntryIterator}.
     *
     * @return the iterator, not null
     */
    @Override
    DateDoubleEntryIterator<T> iterator();

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> subSeries(T startTime, T endTime);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> subSeries(T startTime, boolean includeStart, T endTime, boolean includeEnd);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> head(int numItems);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> tail(int numItems);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> lag(int lagCount);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> add(double amountToAdd);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> add(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionAdd(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> subtract(double amountToSubtract);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> subtract(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionSubtract(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> multiply(double amountToMultiplyBy);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> multiply(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionMultiply(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> divide(double amountToDivideBy);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> divide(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionDivide(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> power(double power);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> power(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionPower(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> minimum(double minValue);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> minimum(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionMinimum(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> maximum(double maxValue);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> maximum(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionMaximum(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> average(double value);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> average(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> unionAverage(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> intersectionFirstValue(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> intersectionSecondValue(DoubleTimeSeries<?> other);

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> noIntersectionOperation(DoubleTimeSeries<?> other);

    // -------------------------------------------------------------------------
    @Override
    // override for covariant return type
    DateDoubleTimeSeries<T> negate();

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> reciprocal();

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> log();

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> log10();

    @Override
        // override for covariant return type
    DateDoubleTimeSeries<T> abs();

    DateDoubleTimeSeries<T> subSeriesFast(int startTime, int endTime);

    DateDoubleTimeSeries<T> subSeriesFast(int startTime, boolean includeStart, int endTime, boolean includeEnd);

    /**
     * Applies a unary operator to each value in the time series.
     *
     * @param operator the operator, not null
     * @return a copy of this series with the operator applied, not null
     */
    DateDoubleTimeSeries<T> operate(DoubleTimeSeriesOperators.UnaryOperator operator);

    /**
     * Applies a binary operator to each value in the time series.
     *
     * @param other    the single value passed into the binary operator
     * @param operator the operator, not null
     * @return a copy of this series with the operator applied, not null
     */
    DateDoubleTimeSeries<T> operate(double other, DoubleTimeSeriesOperators.BinaryOperator operator);

    /**
     * Applies a binary operator to each value in this time series and
     * another time-series, returning the intersection of times.
     *
     * @param otherTimeSeries the other time-series, not null
     * @param operator        the operator, not null
     * @return a copy of this series with the operator applied, not null
     */
    DateDoubleTimeSeries<T> operate(DateDoubleTimeSeries<?> otherTimeSeries, DoubleTimeSeriesOperators.BinaryOperator operator);

    /**
     * Applies a binary operator to each value in this time series and
     * another time-series, returning the union of times.
     *
     * @param otherTimeSeries the other time-series, not null
     * @param operator        the operator, not null
     * @return a copy of this series with the operator applied, not null
     */
    DateDoubleTimeSeries<T> unionOperate(DateDoubleTimeSeries<?> otherTimeSeries, DoubleTimeSeriesOperators.BinaryOperator operator);

    // -------------------------------------------------------------------------

    /**
     * Returns a builder containing the same data as this time-series.
     * <p>
     * The builder has methods to modify the time-series.
     * Entries can be added, or removed via the iterator.
     *
     * @return the builder, not null
     */
    DateDoubleTimeSeriesBuilder<T> toBuilder();

}