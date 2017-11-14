package sk.ystad.loaders;

public class LoaderResult {
    private int succesfullLinesCount;
    private int failedLinesCount;
    private String loaderType;

    public LoaderResult(String type, int succesfullLines, int failedLines) {
        this.loaderType = type;
        this.succesfullLinesCount = succesfullLines;
        this.failedLinesCount = failedLines;
    }

    public int getSuccesfullLinesCount() {
        return succesfullLinesCount;
    }

    public int getFailedLinesCount() {
        return failedLinesCount;
    }

    public String getLoaderType() {
        return loaderType;
    }
}
