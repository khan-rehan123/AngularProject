import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { TeamComponent } from './team/team.component';
import { TilesComponent } from './tiles/tiles.component';
import { TodoComponent } from './todo/todo.component';


@NgModule({
  declarations: [  DashboardComponent,
    TilesComponent,
    InfoCardsComponent,
    DiskSpaceComponent,
    TodoComponent,
    AnalyticsComponent,
    TeamComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule
  ]
})
export class DashboardModule { }
