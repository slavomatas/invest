import { Injectable } from '@angular/core';

@Injectable()
export class SharedVariableService {

  colorScheme: string[] = ['#1C77C3', '#69D2E7', '#A7DBD8', '#F38630', '#F3A712', '#99C24D', '#63D471'];
  constructor() { }

  getColors() {
    return this.colorScheme;
  }

}
