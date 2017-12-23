package sk.ystad.common.data_structures;

/**
 * Generic response for REST calls
 */
public class Response {

    private boolean success;
    private String msg;

    public Response(boolean success, String message) {
        this.success = success;
        this.msg = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
