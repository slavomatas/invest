import { ILoggingService } from './i-logging.service';
import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';

const REQUESTS_DEFAULT_LEVEL = 'info';

@Injectable()
export class LoggingService implements ILoggingService {

    constructor() { }

    public captureRequest(url: string): void {
        Raven.captureMessage('URL: ' + url, {
            level: REQUESTS_DEFAULT_LEVEL
        });
    }

    public captureRequestWithParams(url: string, params: string): void {
        Raven.captureMessage('URL: ' + url + ' - PARAMS:' + params, {
            level: REQUESTS_DEFAULT_LEVEL
        });
    }
}
