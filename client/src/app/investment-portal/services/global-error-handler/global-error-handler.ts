import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { MessageBarService } from '../../message-bar.service';
import { environment } from '../../../../environments/environment';
import * as Raven from 'raven-js';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error) {
    const router = this.injector.get(Router);
    const messageService = this.injector.get(MessageBarService);

    // This is Angular bug, not fixed in Angular 5.2.9 yet
    // Do not show message when app is on dashboard and error message is <<check in next line>>
    if (!(router.routerState.snapshot.url === '/dashboard' && error.message === `Cannot read property 'insertNode' of undefined`)) {
      messageService.addMessage('Whops, something went wrong.', 5000);
    }

    if (environment.production) {
      Raven.captureException(error);
    }

    throw error;
  }

}
