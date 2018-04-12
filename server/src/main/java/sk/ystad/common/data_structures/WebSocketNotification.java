package sk.ystad.common.data_structures;

public class WebSocketNotification {
    String command;
    Long portfolioId;

    public WebSocketNotification(String command, Long portfolioId) {
        this.command = command;
        this.portfolioId = portfolioId;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Long getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(Long portfolioId) {
        this.portfolioId = portfolioId;
    }
}
