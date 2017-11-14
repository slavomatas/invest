package sk.ystad.model.timeseries.database_objects.date.localdate;

import sk.ystad.model.timeseries.database_objects.date.DateDoubleEntryIterator;
import sk.ystad.model.timeseries.database_objects.date.DateTimeSeries;

import java.time.LocalDate;

/**
 * Specialized iterator for time-series of {@code double} values.
 * <p>
 * This is a map-based iterator that avoids working with {@code Map.Entry}.
 * Using this iterator typically involves using a while loop.
 * This iterator is dedicated to {@code LocalDateDoubleTimeSeries}.
 * <p>
 * The "time" key to the time-series is a {@code LocalDate}.
 * See {@link DateTimeSeries} for details about the "time" represented as an {@code int}.
 */
public interface LocalDateDoubleEntryIterator extends DateDoubleEntryIterator<LocalDate> {

}