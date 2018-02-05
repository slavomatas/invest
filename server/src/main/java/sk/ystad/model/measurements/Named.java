package sk.ystad.model.measurements;

import java.lang.reflect.Method;

/**
 * A named instance.
 *
 * @author sma
 */
public interface Named {

    /**
     * Obtains an instance of the specified named type by name.
     * <p>
     * This method operates by reflection.
     * It requires a static method {@code of(String)} method to be present on the type specified.
     * If the method does not exist an exception is thrown.
     *
     * @param <T>  the named type
     * @param type the named type with the {@code of(String)} method
     * @param name the name to find
     * @return the instance of the named type
     * @throws IllegalArgumentException if the specified name could not be found
     */
    public static <T extends Named> T of(Class<T> type, String name) {
        return Unchecked.wrap(() -> {
            Method method = type.getMethod("of", String.class);
            return type.cast(method.invoke(null, name));
        });
    }

    /**
     * Gets the unique name of the instance.
     *
     * @return the unique name
     */
    public abstract String getName();
}
