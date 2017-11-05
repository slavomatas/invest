package sk.ystad.model.timeseries.database_objects.date;

import sk.ystad.model.timeseries.database_objects.DoubleEntryIterator;

/**
 * Specialized iterator for time-series of {@code double} values.
 * <p>
 * This is a map-based iterator that avoids working with {@code Map.Entry}.
 * Using this iterator typically involves using a while loop.
 * This iterator is dedicated to {@code DateDoubleTimeSeries}.
 * <p>
 * The "time" key to the time-series is a date.
 * See {@link DateTimeSeries} for details about the "time" represented as an {@code int}.
 *
 * @param <T> the date type
 */
public interface DateDoubleEntryIterator<T>
        extends DateEntryIterator<T, Double>, DoubleEntryIterator<T> {

}