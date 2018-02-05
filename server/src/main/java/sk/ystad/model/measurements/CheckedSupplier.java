package sk.ystad.model.measurements;

/**
 * A checked version of {@code Supplier}.
 * <p>
 * This is intended to be used with {@link Unchecked}.
 *
 * @param <R> the type of the result
 */
@FunctionalInterface
public interface CheckedSupplier<R> {

    /**
     * Gets a result.
     *
     * @return a result
     * @throws Throwable if an error occurs
     */
    public R get() throws Throwable;

}