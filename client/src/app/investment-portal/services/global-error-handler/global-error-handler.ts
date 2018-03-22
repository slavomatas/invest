import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { MessageBarService } from '../../message-bar.service';
import { environment } from '../../../../environments/environment';
import * as Raven from 'raven-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error) {
    const messageService = this.injector.get(MessageBarService);
    messageService.addMessage('Whops, something went wrong.');

    if (environment.production) {
      Raven.captureException(error);
    }

    throw error;
  }

}
