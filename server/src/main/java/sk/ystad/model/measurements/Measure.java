package sk.ystad.model.measurements;

public interface Measure extends Named {

    public static Measure of(String uniqueName) {
        //ArgumentChecker.notNull(uniqueName, "uniqueName");
        return ImmutableMeasure.of(uniqueName);
    }

    @Override
    public abstract String getName();
}