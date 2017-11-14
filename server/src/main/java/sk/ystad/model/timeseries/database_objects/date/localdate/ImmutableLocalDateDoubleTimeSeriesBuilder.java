package sk.ystad.model.timeseries.database_objects.date.localdate;

import sk.ystad.model.timeseries.database_objects.date.DateDoubleTimeSeries;

import java.time.LocalDate;
import java.util.AbstractMap;
import java.util.Arrays;
import java.util.Map;
import java.util.NoSuchElementException;

/**
 * Builder implementation for {@code ImmutableLocalDateDoubleTimeSeries}.
 */
final class ImmutableLocalDateDoubleTimeSeriesBuilder
        implements LocalDateDoubleTimeSeriesBuilder {

    /**
     * The current size.
     */
    private int size;
    /**
     * The times.
     */
    private int[] times = new int[128];
    /**
     * The values.
     */
    private double[] values = new double[128];

    /**
     * Creates an instance.
     */
    ImmutableLocalDateDoubleTimeSeriesBuilder() {
    }

    private static LocalDate convertFromInt(int date) {
        return LocalDateToIntConverter.convertToLocalDate(date);
    }

    private static int convertToInt(LocalDate date) {
        return LocalDateToIntConverter.convertToInt(date);
    }

    @Override
    public LocalDateDoubleEntryIterator iterator() {
        return new LocalDateDoubleEntryIterator() {

            private int index = -1;

            @Override
            public LocalDate nextTime() {
                return convertFromInt(nextTimeFast());
            }

            @Override
            public int nextTimeFast() {
                if (hasNext() == false) {
                    throw new NoSuchElementException("No more elements in the iteration");
                }
                index++;
                return times[index];
            }

            @Override
            public boolean hasNext() {
                return (index + 1) < size();
            }

            @Override
            public Map.Entry<LocalDate, Double> next() {
                if (hasNext() == false) {
                    throw new NoSuchElementException("No more elements in the iteration");
                }
                index++;
                int date = times[index];
                double value = values[index];
                return makeMapEntry(convertFromInt(date), value);
            }

            private Map.Entry<LocalDate, Double> makeMapEntry(LocalDate key, Double value) {
                return new AbstractMap.SimpleImmutableEntry<>(key, value);
            }

            @Override
            public void remove() {
                if (index < 0) {
                    throw new IllegalStateException("Iterator has not yet been started");
                }
                if (index < size) {
                    System.arraycopy(times, index + 1, times, index, size - index);
                    System.arraycopy(values, index + 1, values, index, size - index);
                }
                size--;
                index--;
            }

            @Override
            public int currentTimeFast() {
                if (index < 0) {
                    throw new IllegalStateException("Iterator has not yet been started");
                }
                return times[index];
            }

            @Override
            public LocalDate currentTime() {
                return convertFromInt(currentTimeFast());
            }

            @Override
            public Double currentValue() {
                if (index < 0) {
                    throw new IllegalStateException("Iterator has not yet been started");
                }
                return values[index];
            }

            @Override
            public int currentIndex() {
                return index;
            }

            @Override
            public double currentValueFast() {
                if (index < 0) {
                    throw new IllegalStateException("Iterator has not yet been started");
                }
                return values[index];
            }
        };
    }

    // -------------------------------------------------------------------------
    @Override
    public int size() {
        return size;
    }

    // -------------------------------------------------------------------------
    @Override
    public LocalDateDoubleTimeSeriesBuilder put(LocalDate time, double value) {
        return put(convertToInt(time), value);
    }

    @Override
    public LocalDateDoubleTimeSeriesBuilder put(int time, double value) {
        int search = Arrays.binarySearch(times, 0, size, time);
        if (search >= 0) {
            values[search] = value;
        } else {
            ensureCapacity(size + 1);
            int pos = -(search + 1);
            System.arraycopy(times, pos, times, pos + 1, size - pos);
            System.arraycopy(values, pos, values, pos + 1, size - pos);
            times[pos] = time;
            values[pos] = value;
            size++;
        }
        return this;
    }

    @Override
    public LocalDateDoubleTimeSeriesBuilder putAll(LocalDate[] times, double[] values) {
        if (times.length != values.length) {
            throw new IllegalArgumentException("Arrays are of different sizes: " + times.length + ", " + values.length);
        }
        ensureCapacity(size + times.length);
        for (int i = 0; i < times.length; i++) {
            put(times[i], values[i]);
        }
        return this;
    }

    // -------------------------------------------------------------------------
    private void ensureCapacity(int newSize) {
        if (newSize > times.length) {
            newSize = Math.max(newSize + 8, (size * 3) / 2);
            times = Arrays.copyOf(times, newSize);
            values = Arrays.copyOf(values, newSize);
        }
    }

    @Override
    public LocalDateDoubleTimeSeriesBuilder putAll(int[] times, double[] values) {
        if (times.length != values.length) {
            throw new IllegalArgumentException("Arrays are of different sizes: " + times.length + ", " + values.length);
        }
        ensureCapacity(size + times.length);
        for (int i = 0; i < times.length; i++) {
            put(times[i], values[i]);
        }
        return this;
    }

    @Override
    public LocalDateDoubleTimeSeriesBuilder putAll(DateDoubleTimeSeries<?> timeSeries) {
        return putAll(timeSeries, 0, timeSeries.size());
    }

    @Override
    public LocalDateDoubleTimeSeriesBuilder putAll(DateDoubleTimeSeries<?> timeSeries, int startPos, int endPos) {
        if (startPos < 0 || startPos > timeSeries.size()) {
            throw new IndexOutOfBoundsException("Invalid start index: " + startPos);
        }
        if (endPos < 0 || endPos > timeSeries.size()) {
            throw new IndexOutOfBoundsException("Invalid end index: " + endPos);
        }
        if (startPos > endPos) {
            throw new IndexOutOfBoundsException("End index not be less than start index");
        }
        if (startPos == endPos) {
            return this;
        }
        int sizeToAdd = endPos - startPos;
        ensureCapacity(size + sizeToAdd);
        if (size == 0) {
            System.arraycopy(timeSeries.timesArrayFast(), startPos, times, 0, sizeToAdd);
            System.arraycopy(timeSeries.valuesArrayFast(), startPos, values, 0, sizeToAdd);
            size = sizeToAdd;
        } else {
            for (int i = startPos; i < endPos; i++) {
                put(timeSeries.getTimeAtIndexFast(i), timeSeries.getValueAtIndexFast(i));
            }
        }
        return this;
    }

    @Override
    public LocalDateDoubleTimeSeriesBuilder putAll(Map<LocalDate, Double> timeSeriesMap) {
        if (timeSeriesMap.size() == 0) {
            return this;
        }
        ensureCapacity(size + timeSeriesMap.size());
        for (Map.Entry<LocalDate, Double> entry : timeSeriesMap.entrySet()) {
            put(entry.getKey(), entry.getValue());
        }
        return this;
    }

    // -------------------------------------------------------------------------
    @Override
    public LocalDateDoubleTimeSeriesBuilder clear() {
        size = 0;
        return this;
    }

    // -------------------------------------------------------------------------
    @Override
    public ImmutableLocalDateDoubleTimeSeries build() {
        if (size == 0) {
            return ImmutableLocalDateDoubleTimeSeries.EMPTY_SERIES;
        }
        return new ImmutableLocalDateDoubleTimeSeries(Arrays.copyOf(times, size), Arrays.copyOf(values, size));
    }

    // -------------------------------------------------------------------------
    @Override
    public String toString() {
        return "Builder[size=" + size + "]";
    }

}
