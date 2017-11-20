///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';

import {fuseAnimations} from '../core/animations';

@Component({
  selector   : 'fuse-investment-portal',
  templateUrl: './investment-portal.component.html',
  styleUrls  : ['./investment-portal.component.scss'],
  animations   : fuseAnimations
})
export class InvestmentPortalComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
