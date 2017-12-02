import { Injectable } from '@angular/core';

@Injectable()
export class SharedVariableService {

  colorScheme: string[] = ['#b71c1c', '#311b92', '#1b5e20', '#ff6f00', '#ad64b3',  '#212121'];
  constructor() { }

  getColors() {
    return this.colorScheme;
  }

}
