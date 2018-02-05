package sk.ystad.model.measurements;

/**
 * An unchecked reflection exception.
 *
 * @author sma
 */
public final class UncheckedReflectiveOperationException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UncheckedReflectiveOperationException(ReflectiveOperationException ex) {
        super(ex);
    }

}
