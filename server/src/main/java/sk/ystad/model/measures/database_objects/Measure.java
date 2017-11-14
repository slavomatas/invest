package sk.ystad.model.measures.database_objects;

public interface Measure extends Named {

    public static Measure of(String uniqueName) {
        //ArgumentChecker.notNull(uniqueName, "uniqueName");
        return ImmutableMeasure.of(uniqueName);
    }

    @Override
    public abstract String getName();
}