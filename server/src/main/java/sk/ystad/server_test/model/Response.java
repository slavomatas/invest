package sk.ystad.server_test.model;

/**
 * Created by martin on 31.10.2017.
 */
public class Response {
    private String result;

    public Response() {
        this.result = "hello";
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
