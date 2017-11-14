package sk.ystad.model.measures.database_objects;

import java.io.Serializable;
import java.util.regex.Pattern;

public final class ImmutableMeasure implements Measure, Serializable {

    private static final Pattern NAME_PATTERN = Pattern.compile("[A-Za-z0-9-_]+");
    private String name;

    private ImmutableMeasure(String name) {
        //ArgumentChecker.notNull(name, "name");
        this.name = name;
        validate();
    }

    public static ImmutableMeasure of(String name) {
        return new ImmutableMeasure(name);
    }

    private void validate() {
        if (!NAME_PATTERN.matcher(name).matches()) {
            throw new IllegalArgumentException("Measure name must only contain the characters A-Z, a-z, 0-9 and -");
        }
    }

    @Override
    public String toString() {
        return getName();
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (obj != null && obj.getClass() == this.getClass()) {
            ImmutableMeasure other = (ImmutableMeasure) obj;
            return this.name.equals(other.name);
        }
        return false;
    }

    @Override
    public int hashCode() {
        int hash = getClass().hashCode();
        hash = hash * 31 + name.hashCode();
        return hash;
    }
}
