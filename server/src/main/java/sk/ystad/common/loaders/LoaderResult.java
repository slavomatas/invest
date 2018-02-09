package sk.ystad.common.loaders;

public class LoaderResult {
    private int succesfullLinesCount;
    private int failedLinesCount;
    private int filteredLinesCount;
    private String loaderType;


    public LoaderResult(String type, int succesfullLines, int failedLines, int filteredCount) {
        this.loaderType = type;
        this.succesfullLinesCount = succesfullLines;
        this.failedLinesCount = failedLines;
        this.filteredLinesCount = filteredCount;
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

    public int getFilteredLinesCount() {
        return filteredLinesCount;
    }
}
