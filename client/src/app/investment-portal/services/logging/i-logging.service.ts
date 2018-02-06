export interface ILoggingService {
    captureRequest(url: string): void;
    captureRequestWithParams(url: string, params: string): void;
}