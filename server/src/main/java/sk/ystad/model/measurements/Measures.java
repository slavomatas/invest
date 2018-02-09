package sk.ystad.model.measurements;

public class Measures {
    //Price Measures
    public static final Measure CLOSE_PRICE = ImmutableMeasure.of("TIINGO_PRICES");
    public static final Measure CLOSE_LOG_PRICE = ImmutableMeasure.of("CLOSE_LOG_PRICE");

    //Time Series Measures
    public static final Measure SLOW_L1_FILTER = ImmutableMeasure.of("SLOW_L1_FILTER");
    public static final Measure FAST_L1_FILTER = ImmutableMeasure.of("FAST_L1_FILTER");
    public static final Measure SLOW_POLY_FILTER = ImmutableMeasure.of("SLOW_POLY_FILTER");
    public static final Measure FAST_POLY_FILTER = ImmutableMeasure.of("FAST_POLY_FILTER");
    public static final Measure FAST_KALMAN_FILTER = ImmutableMeasure.of("FAST_POLY_FILTER");

    //Dashboard Measures
    public static final Measure USER_MARKET_VALUE = ImmutableMeasure.of("USER_MARKET_VALUE");
    public static final Measure USER_CUMULATIVE_RETURN = ImmutableMeasure.of("USER_CUMULATIVE_RETURN");

    //Portfolio Measures
    public static final Measure POSITION_WEIGHTS = ImmutableMeasure.of("POSITION_WEIGHTS");
    public static final Measure PORTFOLIO_POSITIONS = ImmutableMeasure.of("PORTFOLIO_POSITIONS");
    public static final Measure PORTFOLIO_MARKET_VALUE = ImmutableMeasure.of("PORTFOLIO_MARKET_VALUE");
    public static final Measure PORTFOLIO_DAILY_RETURN = ImmutableMeasure.of("PORTFOLIO_RETURNS");
    public static final Measure PORTFOLIO_WEEKLY_RETURN = ImmutableMeasure.of("PORTFOLIO_WEEKLY_RETURNS");
    public static final Measure PORTFOLIO_MONTHLY_RETURN = ImmutableMeasure.of("PORTFOLIO_MONTHLY_RETURNS");
    public static final Measure PORTFOLIO_QUARTERLY_RETURN = ImmutableMeasure.of("PORTFOLIO_QUARTERLY_RETURNS");
    public static final Measure PORTFOLIO_YEARLY_RETURN = ImmutableMeasure.of("PORTFOLIO_YEARLY_RETURNS");
    public static final Measure PORTFOLIO_CUMULATIVE_RETURN = ImmutableMeasure.of("PORTFOLIO_CUMULATIVE_RETURNS");
    public static final Measure PORTFOLIO_DRAWDOWNS = ImmutableMeasure.of("PORTFOLIO_DRAWDOWNS");
    public static final Measure PORTFOLIO_SUMMARY = ImmutableMeasure.of("PORTFOLIO_SUMMARY");

    public static final Measure PORTFOLIO_PERF_STATS = ImmutableMeasure.of("PORTFOLIO_PERF_STATS");
    public static final Measure PORTFOLIO_COMPONENT_PERF_STATS = ImmutableMeasure.of("PORTFOLIO_COMPONENT_PERF_STATS");
    public static final Measure PORTFOLIO_RISK_STATS = ImmutableMeasure.of("PORTFOLIO_RISK_STATS");
    public static final Measure PORTFOLIO_COMPONENT_RISK_STATS = ImmutableMeasure.of("PORTFOLIO_COMPONENT_RISK_STATS");
}
