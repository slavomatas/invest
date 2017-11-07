import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// import { ProjectsDashboardService } from './projects.service';
import * as shape from 'd3-shape';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { fuseAnimations} from "../../../core/animations";
import { LineChartComponent} from '../../our-components/line-chart/line-chart.component';

@Component({
    selector   : 'invest-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.scss'],
    animations   : fuseAnimations
})
export class DashboardComponent
{

}
