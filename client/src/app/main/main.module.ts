import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { FuseMainComponent } from './main.component';
import { FusePagesComponent } from './pages/pages.component';
import { FuseFooterComponent } from './components/footer/footer.component';
import { FuseNavbarVerticalComponent } from './components/navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './components/toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './components/navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './components/navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './components/quick-panel/quick-panel.component';
import { FuseThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';

// import { LineChartComponent } from './our-components/line-chart/line-chart.component';
// import { NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
    declarations: [
        FusePagesComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent,
        // LineChartComponent
    ],
    imports     : [
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        // NgxChartsModule
    ],
    exports     : [
        FuseMainComponent
    ]
})

export class FuseMainModule
{
}
