package sk.ystad.model.measurements;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.lang.reflect.InvocationTargetException;

/**
 * Static utility methods that convert checked exceptions to unchecked.
 *
 * @author sma
 */
public final class Unchecked {

    private Unchecked() {
    }

    /**
     * Wraps a block of code, converting checked exceptions to unchecked.
     *
     * @param <T>   the type of the result
     * @param block the code block to wrap
     * @return the wrapper for unchecked exceptions
     * @throws UncheckedIOException if an IO exception occurs
     * @throws RuntimeException     if an exception occurs
     */
    public static <T> T wrap(CheckedSupplier<T> block) {
        try {
            return block.get();
        } catch (Throwable ex) {
            throw propagate(ex);
        }
    }

    /**
     * Propagates {@code throwable} as-is if possible, or by wrapping in a {@code RuntimeException} if not.
     *
     * @param throwable the {@code Throwable} to propagate
     * @return nothing; this method always throws an exception
     */
    public static RuntimeException propagate(Throwable throwable) {
        if (throwable instanceof InvocationTargetException) {
            throw propagate(((InvocationTargetException) throwable).getCause());
        } else if (throwable instanceof IOException) {
            throw new UncheckedIOException((IOException) throwable);
        } else if (throwable instanceof ReflectiveOperationException) {
            throw new UncheckedReflectiveOperationException((ReflectiveOperationException) throwable);
        } else {
            throw new RuntimeException(throwable);
        }
    }

}
